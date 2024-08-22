import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "react-query";

import { getMenu } from "@/services/api/menu";

const Menu = () => {
  const { data } = useQuery("file", () => getMenu());

  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <pre className="overflow-auto text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Menu;
