export default function Loader() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-black z-50 p-12">
            <img src="/logo-dark-transparent.png" alt="" className="block" />
            <img className="block" src="/Loader.gif" alt="Kiska Jutaa Loader Gif" />
        </div>
    )
}