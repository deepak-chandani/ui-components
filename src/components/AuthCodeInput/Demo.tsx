import AuthCodeInput from "./AuthCodeInput";

export default function AuthCodeInputDemo(){

  function handleSubmit(code: string){
    alert("code submitted: "+code)
  }
  return (
    <div className="demo-container">
      <h2>AuthCodeInput component demo</h2>
      <AuthCodeInput onSubmit={handleSubmit} />
    </div>
  )
}