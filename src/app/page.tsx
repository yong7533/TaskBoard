// =============== Next.js 基礎概念 ===============
// Next.js 是一個基於 React 的全端框架

// =============== React 基礎概念 ===============
// React 是一個用於構建用戶界面的 JavaScript 庫
// 核心概念：
// 1. 組件（Components）：將 UI 拆分成獨立的、可重用的部分
// 2. 狀態（State）：組件的數據存儲，使用 useState 進行管理
// 3. 屬性（Props）：組件之間傳遞數據的方式

// =============== 檔案說明 ===============
// page.tsx 是 Next.js 13+ 中的特殊檔案，作為路由的入口點
// .tsx 副檔名表示這是一個 TypeScript 檔案

// 'use client' 指令
// 用於宣告這是一個"客戶端組件"
// 1. 客戶端組件可以：使用 useState、useEffect 等 React hooks
// 2. 服務器端組件不行：使用瀏覽器 API、添加事件處理器
"use client";


import Link from "next/link";///沒用到（淡）

// React 的 useState Hook
// useState 用於管理組件狀態
// 格式：const [狀態變數, 設置狀態的函數] = useState(初始值)
import { useState, useEffect } from "react";

// 導入自定義組件
// 組件化是 React 的核心概念之一
import TaskList from "./components/TaskList";

// =============== 組件定義 ===============
// 使用函數組件（Function Component）的方式定義
export default function Home() {
  // =============== 狀態管理 ===============
  // useState Hook 使用解構賦值的語法
  // 1. tasks：狀態變數，存儲任務列表
  // 2. setTasks："更新"狀態的函數
  // 3. useState([])：設置"空數組"作為初始值
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string }[]>([]);
  
  // 用於管理輸入框的值
  // 1. newTask：存儲輸入框當前的值
  // 2. setNewTask："更新"輸入框值的函數
  // 3. useState('')：設置空"字符串"作為初始值
  const [newTask, setNewTask] = useState('');

  const [nextId, setNextId] = useState(1);//從1開始編號的ID
  
  useEffect(() => {
    const saveTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(saveTasks);
    const maxId = saveTasks.reduce((max: number, task: { id: number }) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  }, []); // 空依賴數組表示只在組件首次渲染時執行一次
  

  // =============== 事件處理函數 ===============
  ///按下add
  // 添加新任務的函數
  // 使用箭頭函數（Arrow Function）語法
  const addTask = () => {
    // 使用 console.log 進行調試
    // 在開發時可以在瀏覽器控制台查看狀態變化
    console.log("Before" + tasks);

    const newTaskObj = {
      id: nextId, // 使用 nextId 作為任務的唯一標識
      title: newTask, // 任務的標題
      description: "", // 任務的描述，默認為空字符串
    };
    // 展開運算符（...）的使用
    // 1. ...tasks：展開現有的任務數組
    // 2. newTask：將新任務添加到數組末尾
    // 3. 創建新數組而不是修改原數組（不可變性原則）

    const updatedTasks = [...tasks, newTaskObj];
    
    // 使用 setter 函數更新狀態
    // React 會在狀態更新後重新渲染組件
    setTasks(updatedTasks);
    
    console.log("After" + updatedTasks);
    
    // 清空輸入框
    // 這會觸發重新渲染，但 React 會優化實際的 DOM 更新
    setNewTask("");

    setNextId(nextId + 1);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    // 更新 localStorage 中的任務列表
  };
    //filer(element,index) 方法 ：
const handleDelete = (id: number) => {
  // 不等於的（id）保留
  const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      // 更新 localStorage 中的任務列表
    }

  // =============== 渲染 UI ===============
  // return 語句後的 JSX 代碼
  // JSX 是 JavaScript 的語法擴展，允許在 JS 中寫 HTML 式的代碼
  return (
    <main className="p-4 max-w-md mx-auto">
      {/* JSX 中的注釋需要使用這種格式 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* Flex 布局容器 */}
      <div className="flex gap-2 mb-4">
        {/* 
          受控組件（Controlled Component）
          1. value 綁定到 state
          2. onChange 事件更新 state
          3. React 完全控制表單數據
        */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          // e.target.value 獲取輸入框的新值
          onChange={(e) => setNewTask(e.target.value)}
        />
        {/* 
          事件處理
          1. onClick 是 React 的事件處理器
          2. 遵循駝峰命名法（camelCase）
          3. 傳遞函數引用而不是調用函數
        */}
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* 
        組件組合
        1. 將 tasks 作為 props 傳遞給子組件
        2. 單向數據流：父組件 → 子組件
        3. 組件通信的基本方式
      */}
      <TaskList tasks={tasks} onDelete = {handleDelete} />
    </main>
  );
}

// =============== 延伸學習資源 ===============
// 1. React 官方文檔：https://react.dev
// 2. Next.js 官方文檔：https://nextjs.org
// 3. TypeScript 文檔：https://www.typescriptlang.org
// 4. Tailwind CSS 文檔：https://tailwindcss.com
// 5. React Hooks 詳解：https://react.dev/reference/react


/*
functionFN(){
  const[sum,setSum] = useState(0); //運算

  setSum(a+b);

  return(     //結果
    <>
      <p>(sum)</p>
      <input>(a)</input>
      <input>(b)</input>
    </>
  )
}
*/
