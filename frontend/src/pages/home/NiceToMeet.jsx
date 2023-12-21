import styles from "./niceTomeet.module.css";
import data from "../../translation/english.json";
export const NiceToMeet = () => {
  return (
    <section className={styles.nice_to_meet}>
      {data.meet && (
        <div key={data.meet.title} className={styles.wrapper}>
          <img src={data.meet.image} alt={data.meet.title} />
          <div className={styles.content}>
            <h1>{data.meet.title}</h1>
            <h2>{data.meet.name}</h2>
            <p>{data.meet.content1}</p>
            <p>{data.meet.content2}</p>
            <p>{data.meet.content3}</p>
          </div>
        </div>
      )}
    </section>
  );
};
