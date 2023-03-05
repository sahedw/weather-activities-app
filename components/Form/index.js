export default function Form({ onAddActivity }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onAddActivity(data);

    event.target.reset();
  }

  return (
    <section>
      <h1>The Activity App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name"> Activity: </label>
        <input type="text" name="name" id="name" />
        <label htmlFor="isGoodWeatherActivity"> Good Weather Activity: </label>
        <input
          type="checkbox"
          name="isGoodWeatherActivity"
          id="isGoodWeatherActivity"
        />
        <button type="submit"> Add to the list!</button>
      </form>
    </section>
  );
}
