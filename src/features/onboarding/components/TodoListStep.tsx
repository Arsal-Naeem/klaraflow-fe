import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { TodoItem } from "../types";

interface TodoListStepProps {
  todos: TodoItem[];
  onToggleTodo: (id: string, completed: boolean) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
}

export const TodoListStep: React.FC<TodoListStepProps> = ({
  todos,
  onToggleTodo,
  onNext,
  onPrevious,
  isLoading = false,
}) => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const canProceed = todos.every((todo) => todo.completed);

  const TodoCard = ({ todo }: { todo: TodoItem }) => {
    return (
      <Card
        className={`transition-all duration-200 ${
          todo.completed && "border-green-600 bg-green-100 dark:bg-green-900/40"
        }
      }`}
      >
        <CardContent className="px-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) =>
                onToggleTodo(todo.id, checked as boolean)
              }
              className="mt-1 cursor-pointer"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className={`font-semibold ${
                    todo.completed ? "line-through" : ""
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
        <h2 className="text-2xl font-bold mb-2">
          Complete Your Onboarding Tasks
        </h2>
        <p className="text-muted-foreground">
          Complete these tasks to finish your onboarding process. Required tasks
          must be completed to proceed.
        </p>
      </div>

      {/* Progress Summary */}
      <Card>
        <CardContent className="px-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">
              {completedCount} of {todos.length} tasks completed
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

      {/* Navigation */}
      <div className="flex justify-end gap-2 pt-6">
        <Button onClick={onPrevious} variant="outline" disabled={isLoading}>
          Previous
        </Button>

        <Button
          onClick={onNext}
          variant="accent"
          disabled={!canProceed || isLoading}
          className={canProceed ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Next
        </Button>
      </div>

      {!canProceed && (
        <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          Please complete all required tasks to proceed to submission.
        </div>
      )}
    </div>
  );
};
