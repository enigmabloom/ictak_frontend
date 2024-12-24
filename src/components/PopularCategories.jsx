import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import './PopularCategories.css';


const categories = [
  { name: "Finance", internships: "1,720", icon: "💵" },
  { name: "Marketing", internships: "1,720", icon: "📢" },
  { name: "IT Services", internships: "1,720", icon: "💻" },
  { name: "Science", internships: "1,720", icon: "🔬" },
  { name: "Tech", internships: "1,720", icon: "🖥️" },
  { name: "Culinary Arts", internships: "1,720", icon: "🍴" },
  { name: "Sales", internships: "1,720", icon: "📝" },
];

const PopularCategories = () => {
  return (
    <Container className="mt-2 border border-light p-4 ">
      <h2 className="text-center mb-5">Most Popular Categories</h2>
      <Row className="g-4">
        {categories.map((category, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 text-center shadow-sm">
              <Card.Body>
                <div style={{ fontSize: "2rem" }}>{category.icon}</div>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>{category.internships} internships</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {/* <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 text-center shadow-sm" style={{ backgroundColor: '#00acc1' }} text="white">
            <Card.Body>
              <div style={{ fontSize: "2rem" }}>+10K</div>
              <Card.Title>Available now!</Card.Title>
              <Button variant="light" className="mt-2">
                Explore Internships
              </Button>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default PopularCategories;
