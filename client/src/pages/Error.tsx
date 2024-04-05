/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useRouteError } from "react-router-dom";
const Error: React.FC<object> = () => {
  const error: any = useRouteError();
  return (
    <div>
      <h1>Opps!!</h1>
      <h2>Something Went Wrong</h2>
      <h2>
        {error.status} : {error.statusTExt}
      </h2>
    </div>
  );
};
export default Error;
