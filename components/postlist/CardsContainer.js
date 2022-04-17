import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../../styles/Home.module.css";
import { formatDay } from "../../utils/DaysAgo";
import DeletePost from "../../utils/DeletePosts";
import ZipToCity from "../../utils/ZipToCity";
import NumberFormat from "react-number-format";

const CardsContainer = ({
  posts,
  deleteBtnStatus,
  setConfirmationMessage,
  handleClick,
}) => {
  return (
    <div className={style.PostsDisplay}>
      {posts.map((post) => (
        <div key={post.id}>
          <Card className={style.Cards}>
            <Card.Link
              href={`/displaypage/${post.id}`}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <Card.Text className={style.CardImgDiv}>
                <Card.Img
                  variant="top"
                  src={post.imageUrls}
                  alt={post.title}
                  className={style.CardImage}
                />
              </Card.Text>
              <Card.Body>
                <Card.Title
                  className="h6"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textDecoration: "none",
                  }}
                >
                  {post.title}
                </Card.Title>
                {post.price === 0 ? (
                  <Card.Text>Free</Card.Text>
                ) : (
                  <Card.Text>
                    {/* ${post.price} */}
                    <NumberFormat
                      value={post.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Card.Text>
                )}
                <Card.Text style={{ marginBottom: "0" }}>
                  <ZipToCity zip={post.zip} />
                </Card.Text>
                <Card.Text className={style.timeAgo}>
                  {formatDay(post.postDate.seconds)}
                </Card.Text>
              </Card.Body>
            </Card.Link>
          </Card>
          <>
            <DeletePost
              handleClick={handleClick}
              setConfirmationMessage={setConfirmationMessage}
              pid={post.id}
              title={post.title}
              deleteBtnStatus={deleteBtnStatus}
            />
          </>
        </div>
      ))}
    </div>
  );
};
export default CardsContainer;
