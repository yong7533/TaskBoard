
/**
 * TaskList 元件
 *
 * 此元件用於渲染任務列表。每個任務都帶有一個刪除按鈕。
 * 屬性:
 * - tasks: 一個包含任務字串的陣列，用於顯示任務。
 * - onDelete: 一個函數，用於根據索引刪除任務。
 */
"use client";
// 引入 React 和 Next.js 的 Link 元件

import Link from "next/link";

export default function TaskList({ tasks, onDelete }){
    return(
        // 渲染一個無序列表，包含所有任務
        <ul className="space-y-2">
        {tasks.map((task) =>(
            // 每個任務作為列表項顯示
            <li key={task.id} className="border p-2 rounded flex justify-between items-center">
                
                {/* 顯示任務內容 */}
                <Link 
                 href={`/task/${task.id}`}
                 className="text-blue-600 hover:underline"
                >
                  {task.title}
                </Link>
                
                <button
                // 刪除按鈕，點擊後觸發 onDelete 函數
                className="text-red-500"
                onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>
            </li>
        ))}
        </ul>
    )
}
