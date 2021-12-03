import { Card, Button, Col, Row } from "react-bootstrap";
import { blockTransaction, approveTransaction } from "../utilities/function";
import "../App.css"

const TransactionCard = ({ transactions, endpoint, setLoading }) => {
  return (
    <>
      {transactions.length > 0 &&
        transactions.map((transaction) => (
          <Row className="mb-2 mt-2" key={transaction.TransactionID}>
            <Col xs={10} sm={8} md={5} className="mx-auto">
              <Card className="text-left">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    Transaction ID: {transaction.TransactionID}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    From User: {transaction.FromUser}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    To User: {transaction.ToUser}
                  </Card.Text>
                  <Card.Text>Amount: ${transaction.Amount}</Card.Text>
                  <Card.Text className="d-flex flex-row ml-auto">
                    <Button
                      variant="danger"
                      className="mr-2 blockBtn"
                      onClick={() => {
                        setLoading(true);
                        blockTransaction(transaction.TransactionID, endpoint);
                      }}
                    >
                      Block
                    </Button>
                    <Button
                      variant="success"
                      className="mx-2 approveBtn"
                      onClick={() => {
                        setLoading(true);
                        approveTransaction(
                          transaction.TransactionID,
                          endpoint,
                          setLoading
                        );
                      }}
                    >
                      Approve
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default TransactionCard;
