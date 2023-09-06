/* eslint-disable react/prop-types */
export default function Alert(props) {
  const cap = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div style={{ height: "40px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.msg}</strong>
        </div>
      )}
    </div>
  );
}
