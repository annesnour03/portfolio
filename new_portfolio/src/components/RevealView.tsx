import { useInView } from "react-intersection-observer";
export const RevealView = ({
  children,
  triggerOnce = true,
}: {
  children: JSX.Element;
  triggerOnce?: boolean;
}) => {
  const { ref, inView } = useInView({ triggerOnce: triggerOnce });
  return <div ref={ref}>{inView && children}</div>;
};
