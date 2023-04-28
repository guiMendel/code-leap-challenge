import './style.css'

export default function CreateUser() {
  return (
    <form>
      <h1>Welcome to CodeLeap network!</h1>

      <span className='entry' htmlFor='username'>
        <label htmlFor="username">Please enter your username</label>
        <input type="text" id='username' />
      </span>

      <button>enter</button>
    </form>
  )
}
