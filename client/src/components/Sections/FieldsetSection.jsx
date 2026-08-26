/**
 * @file FieldsetSection.jsx
 * @description Fieldset -> Create Section
 */
/**
 * @function FieldsetSection
 * @param {Object} props
 * @param {Number} props.index
 * @param {function} props.remove - (event) => function
 * @returns {JSX.Element}
 * @description Create Section Fieldset
 */
export default function FieldsetSection({ index, remove }) {
  return (
    <fieldset>
      <label htmlFor="title">Section title:</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="image_path">Add a picture (jpg, png):</label>
      <input
        type="file"
        id="image_path"
        name="image_path"
        accept="image/png, image/jpeg, image/jpg"
      />
      <label htmlFor="text">Text:</label>
      <input type="text" id="text" name="text" required />
      <input
        type="number"
        id="list_nb"
        name="list_nb"
        value={index + 1}
        readOnly
      />
      <button onClick={remove}>Cancel</button>
    </fieldset>
  );
}
