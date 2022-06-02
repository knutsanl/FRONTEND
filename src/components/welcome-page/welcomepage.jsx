import "./welcomepagestyle.css";

function WelcomePage(props) {
  return (
    <div className="welcome-page">
        <h1>Welcome</h1>
        <p>On this page you get access to all the plants that are located on campus Mustad. You can see what kind of plant they are, when they were last watered etc.</p>
        <p>If you are a gardener or a manager, press 'Log in' in the navigation bar to get to the log in page.</p>
        <p>After you have logged in, you have access to many functionalities.</p>
        <p>If you are logged in as a gardener, you can see when the plants were last watered, and you can reset the water intervals by watering the plants and pressing the reset button.</p>
        <p>If you are logged in as a manager, you get access to all profiles registered, you can add new profiles, and you can edit the already existing users. You can also add, edit and delete all of the plants.</p>
    </div>
  );
}

export default WelcomePage;
