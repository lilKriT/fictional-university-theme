import "../css/style.scss";

// Our modules / classes
import MobileMenu from "./modules/MobileMenu";
import HeroSlider from "./modules/HeroSlider";
import GoogleMap from "./modules/GoogleMap";
import MyNotes from "./modules/MyNotes";
import Search from "./modules/Search"; // Live search
import Like from "./modules/Like";

// Instantiate a new object using our modules/classes
const mobileMenu = new MobileMenu();
const heroSlider = new HeroSlider();
const googleMap = new GoogleMap();

// Live Search
const search = new Search();

// My notes
const myNotes = new MyNotes();

// Likes
const like = new Like();
