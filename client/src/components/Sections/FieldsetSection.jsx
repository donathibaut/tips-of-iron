/**
 * @file FieldsetSection.jsx
 * @description Fieldset -> Create Section
 */
/**
 * @function FieldsetSection
 * @param {Object} props
 * @param {Number} props.index
 * @param {Array} props.sections - sections state
 * @param {Function} props.onChange - Listen on input change
 * @param {function} props.remove - (event) => function
 * @returns {JSX.Element}
 * @description Create Section Fieldset
 */
export default function FieldsetSection({
  index,
  section = "",
  remove,
  onChange,
}) {
  return (
    <fieldset className="section-fieldset">
      <label htmlFor={`section-title-${index}`}>Section title:</label>
      <input
        type="text"
        id={`section-title-${index}`}
        name="section-title"
        maxLength="100"
        defaultValue={section.title}
        onChange={(event) => onChange("title", event.target.value)}
        required
        autoComplete="off"
      />
      <label htmlFor={`section-image_path-${index}`}>
        Image URL (optional):
      </label>
      <input
        type="url"
        id={`section-image_path-${index}`}
        name="section-image_path"
        defaultValue={section.image_path}
        placeholder="https://hoi4.paradoxwikis.com/images/7/72/image.png"
        pattern="https://.*"
        autoComplete="url"
        onChange={(event) => onChange("image_path", event.target.value)}
      />
      <label htmlFor={`section-text-${index}`}>Text:</label>
      <textarea
        id={`section-text-${index}`}
        name="section-text"
        onChange={(event) => onChange("text", event.target.value)}
        rows="5"
        required
        autoComplete="off"
      >
        {section.text}
      </textarea>

      {/* Purely visual */}
      <p className="list-position" hidden>
        {index + 1}
      </p>

      <button
        className="btn cancel-section remove-btn"
        type="button"
        onClick={remove}
      >
        Remove
      </button>
    </fieldset>
  );
}
