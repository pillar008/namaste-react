import { useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>The way you are going is not right.</h1>
      <h3>
        {err.status}:{err.statusText}
      </h3>
    </div>
  );
};

export default Error;
