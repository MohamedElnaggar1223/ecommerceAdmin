import { IResourceComponentsProps, useIsAuthenticated } from "@refinedev/core";
import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const OrdersList: React.FC<IResourceComponentsProps> = () => {
  const { data: auth, refetch } = useIsAuthenticated();
  return <MuiListInferencer />;
};
