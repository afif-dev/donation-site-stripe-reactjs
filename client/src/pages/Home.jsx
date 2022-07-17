import DonationForm from "../components/DonationForm";
import DonateImg from "../images/cover-img.jpg";
const Home = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 place-content-center">
      <div
        className="bg-cover bg-no-repeat bg-center rounded-lg hidden xl:block"
        style={{
          backgroundImage: `url(${DonateImg})`,
        }}
      ></div>
      <div className="text-center mx-auto max-w-screen-sm">
        <h1 className="text-4xl font-extrabold mb-8 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500">Donate to Our Community</h1>
        <p className="mb-5">
          Your donation helps us to offer and serve better services.
          <br className="hidden sm:block" />
          Your contribution, however big or small, is valuable for our future.
        </p>
        <DonationForm />
      </div>
    </div>
  );
};

export default Home;
