import React, { useState } from "react";
import { Container } from "./Theme";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { Button, CircularProgress } from "@material-ui/core";
import { useSendEmailMutation } from "../../redux/api";
import { useHistory } from "react-router";

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const TitleContainer = styled.div`
  margin-bottom: 10px;
`;
const Title = styled.h1``;
const TextContainer = styled.div`
  margin-bottom: 10px;
`;
type errorProp = {
  error: boolean;
};
const ErrorContainer = styled.div<errorProp>`
  display: ${(props) => (props.error === true ? "flex" : "none")};
`;
const Error = styled.span`
  color: red;
`;

const AdminEmail = () => {
  const history = useHistory();
  const [send, { isLoading }] = useSendEmailMutation();
  const [message, setMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSend = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.log(message);
    try {
      if (message !== "") {
        setErrorMessage("");
        const mes = {
          message: message,
        };
        await send(mes).unwrap();
        history.push("/admin");
      } else {
        setErrorMessage("Not Completed");
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("There is something wrong ,please contact us");
    }
  };
  return (
    <Container>
      <Wrapper>
        <TitleContainer>
          <Title>Email</Title>
        </TitleContainer>
        <TextContainer>
          <TextField
            placeholder="Write down what you want to sent to your customers!"
            id="outlined-basic"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            onChange={(e) => setMessage(e.target.value)}
          />
        </TextContainer>

        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleSend(e)}
        >
          {isLoading ? <CircularProgress /> : "Send"}
        </Button>
        <ErrorContainer error={errorMessage !== ""}>
          <Error>{errorMessage}</Error>
        </ErrorContainer>
      </Wrapper>
    </Container>
  );
};

export default AdminEmail;
