/*NEW*/
import { FC } from 'react';
import { OnboardingData, TodoItem } from '../../types';
import { useOnboarding } from '../../hooks/useOnboarding';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  data: OnboardingData;
  onNext: () => void;
}

const TodoRow: FC<{ todo: TodoItem }> = ({ todo }) => {
    const { updateTodo } = useOnboarding();

    const handleCheckChange = async (checked: boolean) => {
        await updateTodo({ todoId: todo.id, completed: checked });
    };

    return (
        <div className="flex items-center space-x-3 p-3 border rounded-md">
            <Checkbox 
                id={`todo-${todo.id}`} 
                checked={todo.is_completed}
                onCheckedChange={handleCheckChange}
            />
            <Label htmlFor={`todo-${todo.id}`} className="flex-1 cursor-pointer">
                <p className="font-medium">{todo.title}</p>
                {todo.description && <p className="text-sm text-muted-foreground">{todo.description}</p>}
            </Label>
        </div>
    );
}

export const TodoListStep: FC<Props> = ({ data, onNext }) => {
  // You might want to enforce all todos are completed before continuing
  const allTodosCompleted = data.todos.every(todo => todo.is_completed);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 3: Complete Your To-Do List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.todos.map(todo => <TodoRow key={todo.id} todo={todo} />)}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext} disabled={!allTodosCompleted}>
            Continue
        </Button>
      </CardFooter>
    </Card>
  );
};