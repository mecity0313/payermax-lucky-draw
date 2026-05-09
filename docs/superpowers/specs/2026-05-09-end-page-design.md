# 结束页设计文档

> 日期：2026-05-09  
> 状态：已审批，待实现

## 需求背景

当前抽奖结束后（最后一轮 RESULT 点击 Next Round）会直接 `resetLottery()` 回到 HOME 页。本次需求改为跳转到专用的**结束页**，永久停留展示，引导中奖者前往领奖区。

---

## 设计决策

| 问题 | 决策 |
|------|------|
| 有无返回/重置按钮 | 无，纯展示页 |
| 有无关闭浏览器提示 | 无 |
| 布局风格 | 方案 C：大字幕感谢页（THANK YOU 为主视觉） |
| 外壳 | 复用 MainLayout（侧边栏 + 顶栏保持不变） |
| 键盘响应 | END 状态下 Space/Enter 无效果 |
| 进入动画 | 淡入（fade-in），无额外特效 |

---

## 状态机变更

```
旧：...RESULT → nextRound() → HOME（resetLottery）
新：...RESULT → nextRound() → END（仅最后一轮）
```

- 新增状态值 `'END'`
- `LotteryContext.nextRound()` 在最后一轮时改为 `setCurrentPhase('END')`，不再调用 `resetLottery()`
- 键盘监听 `handleKeyDown` 中 END 状态不执行任何操作

---

## 界面规格

**布局：** 复用 `MainLayout`，内容区（`main > .flex-1`）渲染 `EndView`。

**EndView 内容区（居中）：**

1. **背景光晕** — 金色径向渐变，`rgba(255,215,0,0.06)`，模糊装饰
2. **THANK YOU** — `font-size: 4rem`，字重 900，金色渐变（`#FFD700` → `#B8860B`），`letter-spacing: 4px`
3. **副标题** — `Grand Ceremony 2025`，小号，`letter-spacing: 8px`，低透明度白色
4. **分隔线** — 细线，金色渐变，宽 48px
5. **领奖提示框** — 金色边框（`rgba(255,215,0,0.25)`），半透明背景，内含：
   - 次行：`🎉 抽奖圆满结束`（浅灰色）
   - 主行：`请中奖的同学前往 领奖区 登记领取奖品`（"领奖区"金色加粗）
6. **装饰点** — 三个金色小圆点，交替透明度

**入场动画：** Framer Motion `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`，duration 1s。

---

## 文件变更清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/views/EndView.jsx` | 新增 | 结束页视图组件 |
| `src/store/LotteryContext.jsx` | 修改 | `nextRound()` 最后一轮改为 `setCurrentPhase('END')`；键盘监听 END 状态无操作 |
| `src/App.jsx` | 修改 | 新增 `currentPhase === 'END'` 渲染 `<EndView />` |

---

## 不在范围内

- 领奖区位置/房间号（固定文案，无需配置）
- 重置/返回首页功能
- 结束页上展示获奖者名单（不在本次需求内）
- 音效
