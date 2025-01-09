import { useState } from "react";

export default function FormList() {
  const [forms, setForms] = useState([{ firstName: "", lastName: "" }]);

  const addForm = () => {
    setForms([...forms, { firstName: "", lastName: "" }]);
  };

  const handleInputChange = (e, index) => {
    console.log(index);
    const newForms = [...forms];
    const updatedForm = { ...newForms[index] };
    updatedForm[e.target.name] = e.target.value;
    newForms[index] = updatedForm;
    setForms(newForms);
  };

  const deleteForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  return (
    <>
      <p>meow</p>
      {forms.map((form, index) => (
        <div key={index}>
          <form>
            <input
              type="text"
              value={form.firstName}
              name="firstName"
              onChange={(e) => handleInputChange(e, index)}
            />
            <input
              type="text"
              value={form.lastName}
              name="lastName"
              onChange={(e) => handleInputChange(e, index)}
            />
          </form>

          <div>
            <button onClick={() => deleteForm(index)}>Delete form</button>
          </div>
        </div>
      ))}
      <button onClick={addForm}>Add new form</button>
    </>
  );
}
