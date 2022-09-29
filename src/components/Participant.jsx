const style = {
  width: "100%",
  background: "#a86",
  display: "flex",
  justifyContent: "space-around",
  color: "black",
  fontSize: "18px",
};

export const Participant = ({ user }) => {
  return (
    <div style={style}>
      <h4 style={{ width: "50%" }}>{user.username}</h4>
      <h4 style={{ width: "50%" }}>{user?.points}</h4>
    </div>
  );
};
