/**
 * TaskDelete 元件
 *
 * 此元件用於顯示和編輯特定任務的詳細資訊。
 * 屬性:
 * - params: 包含任務相關的參數。
 *
 * [id]: 動態路由參數，用於識別特定任務的唯一 ID。
 */

"use client";

// 引入 Next.js 的 useRouter，用於導航
import {useRouter} from "next/navigation";
// 引入 React 的 useEffect 和 useState，用於管理狀態和副作用
import {useEffect,useState} from "react";

export default function TaskDetail({params}){
const router = useRouter();//取得網址結構
    const {id} = params;//取得網址id
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");// 使用 useEffect 來獲取任務詳細資訊
    
const handleSave = () => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"))||[];
        const updatedTasks = savedTasks.map((task) => 
            task.id === Number(id) ? {...task, title, description} : task
        );// 比對id
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        router.push("/");// 導航到任務列表頁面（首頁）
};
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = savedTasks.find((t) => t.id === Number(id));
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
        }
    }, [id]);

    return(
        <main className="p-4 max-w-xl mx-auto">
            {/* 標題 */}
            <h1 className="text-2xl font-bold mb-4">
                Task Details
            </h1>
            {/* 標題輸入框 */}
            <input
            className="border p-2 w-full mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            />
            {/* 描述輸入框 */}
            <textarea
            className="border p-2 w-full mb-2"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
            />
            {/*  */}
<button
            className="bg-green-500 text-white px-4 py-2 rounded"
onClick={handleSave}
            >
                Save
            </button>
            
        </main>
    )
}
