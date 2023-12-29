import { Footer } from "../../components/footer/Footer";
import { Logo } from "../../components/logo/Logo";
import { Link, useParams } from "react-router-dom";
// import { userStore } from "../../stores/userStore";

export const Cart = () => {
  // const id = userStore.getState().id;

  return (
    <div>
      {/* component nav? */}
      <nav>
        <ul>
          {/* <Link to={`/profile/${id}`} onClick={} >
          back
        </Link> */}
          <Logo />
          {/* <li type="button" onClick={onLogoutClick}>
          log out
        </li> */}
        </ul>
      </nav>
      <div>
        <div>
          <img src="" alt="" />
          <p></p>
        </div>
        <div>
          <p>
            options:<span></span>
          </p>
          <p>
            quantity:<span></span>bouquet(s)
          </p>
          <p>
            price:<span></span>kr
          </p>
          <p>
            delivery:<span></span>kr
          </p>
        </div>
      </div>
      <hr />
      <p>
        sum:<span></span>kr
      </p>

      <div>
        {/* component typography? */}
        <p>
          If you want to send flowers to someone or convey your feelings for the
          week through FloraEcho, please leave a message below. We will
          customize a secret floral based on your message. There will be
          different surprises every week!
        </p>
        <label>
          <input type="textarea" className="" />
        </label>
      </div>
      <Footer />
    </div>
  );
};
