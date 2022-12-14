import { FC } from "react";
import { Meta } from "./Meta";
import { Loading as _Loading } from "@auspices/eos";

type LoadingProps = {
  title?: string;
};

export const Loading: FC<LoadingProps> = ({ title = "Loading" }) => {
  return (
    <>
      <Meta title={title} />

      <_Loading />
    </>
  );
};
