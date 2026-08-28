/**
 * @file FieldsetSection.jsx
 * @description Fieldset -> Create Section
 */
/**
 * @function FieldsetSection
 * @param {Object} props
 * @param {Number} props.index
 * @param {Function} props.onChange - Listen on input change
 * @param {function} props.remove - (event) => function
 * @returns {JSX.Element}
 * @description Create Section Fieldset
 */
export default function FieldsetSection({ index, remove, onChange }) {
  return (
    <fieldset>
      <label htmlFor={`section-title-${index}`}>Section title:</label>
      <input
        type="text"
        id={`section-title-${index}`}
        name="section-title"
        onChange={(event) => onChange("title", event.target.value)}
        required
      />
      <label htmlFor={`section-image_path-${index}`}>Add a picture URL:</label>
      <input
        type="url"
        id={`section-image_path-${index}`}
        name="section-image_path"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(event) => onChange("image_path", event.target.value)}
      />
      <label htmlFor={`section-text-${index}`}>Text:</label>
      <input
        type="text"
        id={`section-text-${index}`}
        name="section-text"
        onChange={(event) => onChange("text", event.target.value)}
        required
      />

      {/* Purely visual data */}
      <p className="list-position">{index + 1}</p>

      <button type="button" onClick={remove}>
        Cancel
      </button>
    </fieldset>
  );
}
