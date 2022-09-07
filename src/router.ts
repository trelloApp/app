import HomePage from "./pages/home/HomePage";
import TodoTask from "./pages/todoTask/TodoTask";
import Pokemon from "./pages/Pokemon/Pokemon";
const routers = [
  { path: "", component: HomePage },
  { path: "/todoTask", component: TodoTask },
  { path: "/pokemon", component: Pokemon },
];
export default routers;
