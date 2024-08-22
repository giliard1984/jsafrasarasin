import React from "react";

interface Props {
  title: string
  description?: string
};

const PageTitle: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <div style={{ fontSize: 26, fontWeight: 300 }}>{title}</div>
      {description && <div>{description}</div>}
    </>
  );
}

export default PageTitle;