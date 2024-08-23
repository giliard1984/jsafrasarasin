import React from "react";

import styles from "./PageTitle.module.scss";

interface Props {
  title: string
  description?: string
};

const PageTitle: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <div className={styles.title}>{title}</div>
      {description && <div>{description}</div>}
    </>
  );
}

export default PageTitle;
