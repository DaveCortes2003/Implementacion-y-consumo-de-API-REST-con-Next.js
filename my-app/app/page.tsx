'use client'
import { useRouter } from "next/navigation";
import './style.css';  

const HomeClient = () => {
    const router = useRouter();

    return (
        <div className="home-container">
            <h1 className="home-title">Welcome</h1>
            <p className="home-subtitle">Discover and share your posts</p>
        </div>
    )
}

export default HomeClient