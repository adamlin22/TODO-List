import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState(0);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("/user/list")
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, [userList]);

  const addUser = async () => {
    try {
      const data = {
        username: userName,
        password: password,
        fullname: fullName,
        age: age,
      };
      const res = await axios.post("/user/add", data);
      alert(res.data.msg);
      setFullName("");
      setUserName("");
      setPassword("");
      setAge(0);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteUser = async (username) => {
    try {
      const res = await axios.delete(`/user/delete/${username}`);
      alert(res.data.msg);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <div style={{ paddingTop: "20px" }}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              value={userName}
              type="text"
              placeholder="UserName"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFullName">
            <Form.Label>FullName</Form.Label>
            <Form.Control
              value={fullName}
              type="text"
              placeholder="FullName"
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              value={age}
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="button" onClick={addUser}>
            Add
          </Button>
        </Form>
      </div>
      <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>USER LIST:</h1>

      <div>
        {userList.map((item, index) => (
          <Card style={{ marginBottom: "20px" }} key={index}>
            <Card.Header>{item.username}</Card.Header>
            <Card.Body>
              <Card.Title>{item.fullname}</Card.Title>
              <Card.Text>Password: {item.password}</Card.Text>
              <Card.Text>Age: {item.age}</Card.Text>
              <Button
                variant="danger"
                onClick={(e) => deleteUser(item.username)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
