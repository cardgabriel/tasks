import React, { Fragment, useState } from "react";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { Grid, Cell } from "baseui/layout-grid";
import Check from "baseui/icon/check";
import Delete from "baseui/icon/delete";
import DeleteAlt from "baseui/icon/delete-alt";

interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");

  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  return (
    <Grid>
      <Cell span={6}>
        <Card>
          <StyledBody>
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.currentTarget.value)}
              placeholder="Controlled Input"
              type="text"
              autoFocus
            />
          </StyledBody>
          <StyledAction>
            <Button onClick={handleSubmit}>Save</Button>
          </StyledAction>
        </Card>
      </Cell>

      {tasks.map((t: ITask, i: number) => {
        return (
          <Cell span={6}>
            <Card>
              <StyledBody key={i}>
                {t.done ? (
                  <Fragment>
                    <h1> {t.name}</h1>
                    <p>Tarea: Realizada</p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h1> {t.name}</h1>
                    <p>Tarea: Pendiente</p>
                  </Fragment>
                )}
              </StyledBody>
              <StyledAction>
                <Button onClick={() => toggleDoneTask(i)}>
                  {t.done ? <Delete /> : <Check />}
                </Button>
              </StyledAction>
              <StyledAction>
                <Button onClick={() => removeTask(i)}>
                  Borrar Tarea
                  <DeleteAlt />
                </Button>
              </StyledAction>
            </Card>
          </Cell>
        );
      })}
    </Grid>
  );
}

export default App;
