import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { TodoItem } from "../../types";
import { useUpdateTodoItem } from "../../hooks/useOnboarding";
import { useTranslations } from "next-intl";

interface TodoListStepProps {
  todos: TodoItem[];
  onNext: () => void;
}

export const TodoListStep: React.FC<TodoListStepProps> = ({
  todos,
  onNext,
}) => {
  const updateTodoItem = useUpdateTodoItem();

  const t = useTranslations("onboarding.steps.step3");
  const tMain = useTranslations("onboarding");
  const tCommon = useTranslations("common");

  const completedCount = todos.filter((todo) => todo.is_completed).length;
  const canProceed = todos.every((todo) => todo.is_completed);

  const handleTodoToggle = async (id: string, completed: boolean) => {
    try {
      await updateTodoItem.mutateAsync({ id, completed });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const TodoCard = ({ todo }: { todo: TodoItem }) => {
    return (
      <Card
        className={`transition-all duration-200 ${
          todo.is_completed && "border-green-600 bg-green-100 dark:bg-green-900/40"
        }
      }`}
      >
        <CardContent className="px-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={todo.is_completed}
              onCheckedChange={(checked) =>
                handleTodoToggle(todo.id, checked as boolean)
              }
              className="mt-1 cursor-pointer"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className={`font-semibold ${
                    todo.is_completed ? "line-through" : ""
                  }`}
                >
                  {todo.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground">
                {todo.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">{t("title")}</h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardContent className="px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {completedCount} {tMain("of")} {todos.length}{" "}
              {t("tasksCompleted")}
            </span>
          </div>
          <Progress
            value={(completedCount / todos.length) * 100}
            className="h-2"
          />
        </CardContent>
      </Card>

      {/* Tasks by Category */}

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>

      {!canProceed ? (
        <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {t("disclaimer")}
        </div>
      ) : (
        <div className="flex justify-end gap-2 pt-3">
          <Button onClick={onNext} variant="accent" size={"lg"}>
            {tCommon("next")}
          </Button>
        </div>
      )}
    </div>
  );
};
