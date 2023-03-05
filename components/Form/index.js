export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const inputText = event.target.elements[0].value;
    const checkedWeather = event.target.elements[1].checked;

    onAddActivity({ inputText: inputText, checkedWeather: checkedWeather });

    event.target.reset();
  }

  return (
    <section>
      <h3>Add a new activity:</h3>
      <form className="form" onSubmit={handleSubmit}>
        <section>
          {" "}
          <label htmlFor="name"> Activity: </label>
          <input type="text" name="name" id="name" />
        </section>
        <section>
          <label htmlFor="isGoodWeatherActivity">
            {" "}
            Good Weather Activity:{" "}
          </label>
          <input
            type="checkbox"
            name="isGoodWeatherActivity"
            id="isGoodWeatherActivity"
          />
        </section>

        <section>
          <button type="submit"> Submit </button>
        </section>
      </form>
    </section>
  );
}
