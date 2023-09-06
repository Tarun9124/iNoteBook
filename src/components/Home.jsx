/* eslint-disable react/prop-types */
import Note from "./Note";

export default function Home(props) {
  const { showAlert } = props;
  return (
    <>
      <Note showAlert={showAlert} />
    </>
  );
}
