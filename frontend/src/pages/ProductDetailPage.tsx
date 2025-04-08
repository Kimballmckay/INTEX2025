import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView";
import Logout from "../components/Logout";

function ProductDetailPage() {
  return (
    //security
    (
      <AuthorizeView>
        <span>
          <Logout>
            Logout
            <AuthorizedUser value="email" />
          </Logout>
        </span>
        {/* after we merge, we need to move authorize view to the bottom of the whole return */}
      </AuthorizeView>
    ) > <div></div>
  );
}

export default ProductDetailPage;
