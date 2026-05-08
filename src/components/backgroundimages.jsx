const publicUrl = process.env.PUBLIC_URL || "";

const pageBackgrounds = {
  "/": `${publicUrl}/anime-backgrounds/bg%2037.jpeg`,
  "/signup": `${publicUrl}/anime-backgrounds/signup-anime.svg`,
  "/signin": `${publicUrl}/anime-backgrounds/signin-anime.svg`,
  "/signout": `${publicUrl}/anime-backgrounds/bg36.jpeg`,
  "/addproduct": `${publicUrl}/anime-backgrounds/addproduct-anime.svg`,
  "/cart": `${publicUrl}/anime-backgrounds/cart-anime.svg`,
  "/makepayment": `${publicUrl}/anime-backgrounds/payment-anime.svg`,
  "/movies": `${publicUrl}/anime-backgrounds/bg37.jpeg`,
};

export const resolveBackgroundImage = (pathname = "/") => {
  const normalizedPath = pathname.toLowerCase();

  if (pageBackgrounds[normalizedPath]) {
    return pageBackgrounds[normalizedPath];
  }

  if (normalizedPath.startsWith("/movies/")) {
    return pageBackgrounds["/movies"];
  }

  return pageBackgrounds["/"];
};

export default pageBackgrounds;
