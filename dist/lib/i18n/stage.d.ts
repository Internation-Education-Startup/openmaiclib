export declare const stageZhCN: {
    readonly stage: {
        readonly currentScene: "当前场景";
        readonly generating: "生成中...";
        readonly paused: "已暂停";
        readonly generationFailed: "生成失败";
        readonly confirmSwitchTitle: "切换页面";
        readonly confirmSwitchMessage: "当前话题正在进行中，切换页面将结束当前话题。确定要切换吗？";
        readonly generatingNextPage: "场景正在生成，请稍候...";
        readonly fullscreen: "全屏";
        readonly exitFullscreen: "退出全屏";
    };
    readonly whiteboard: {
        readonly title: "互动白板";
        readonly open: "打开白板";
        readonly clear: "清空白板";
        readonly minimize: "最小化白板";
        readonly ready: "白板已就绪";
        readonly readyHint: "AI 添加元素后将在此显示";
        readonly clearSuccess: "白板已清空";
        readonly clearError: "清空白板失败：";
        readonly resetView: "重置视图";
        readonly restoreError: "恢复白板失败：";
        readonly history: "历史记录";
        readonly restore: "恢复";
        readonly noHistory: "暂无历史记录";
        readonly restored: "已恢复白板内容";
        readonly elementCount: "{count} 个元素";
    };
    readonly quiz: {
        readonly title: "随堂测验";
        readonly subtitle: "检测你的学习成果";
        readonly questionsCount: "道题";
        readonly totalPrefix: "共";
        readonly pointsSuffix: "分";
        readonly startQuiz: "开始答题";
        readonly multipleChoiceHint: "（多选题，请选择所有正确答案）";
        readonly inputPlaceholder: "请在此输入你的回答...";
        readonly charCount: "字";
        readonly yourAnswer: "你的回答：";
        readonly notAnswered: "未作答";
        readonly aiComment: "AI 点评";
        readonly singleChoice: "单选";
        readonly multipleChoice: "多选";
        readonly shortAnswer: "简答";
        readonly analysis: "解析：";
        readonly excellent: "优秀！";
        readonly keepGoing: "继续加油！";
        readonly needsReview: "需要复习";
        readonly correct: "正确";
        readonly incorrect: "错误";
        readonly answering: "答题中";
        readonly submitAnswers: "提交答案";
        readonly aiGrading: "AI 正在批改中...";
        readonly aiGradingWait: "请稍候，正在分析你的答案";
        readonly quizReport: "答题报告";
        readonly retry: "重新答题";
    };
    readonly roundtable: {
        readonly teacher: "教师";
        readonly you: "你";
        readonly inputPlaceholder: "输入你的消息...";
        readonly listening: "录音中...";
        readonly processing: "处理中...";
        readonly noSpeechDetected: "未检测到语音，请重试";
        readonly discussionEnded: "讨论已结束";
        readonly qaEnded: "问答已结束";
        readonly thinking: "思考中";
        readonly yourTurn: "轮到你发言了";
        readonly stopDiscussion: "结束讨论";
        readonly autoPlay: "自动播放";
        readonly autoPlayOff: "关闭自动播放";
        readonly speed: "倍速";
        readonly voiceInput: "语音输入";
        readonly voiceInputDisabled: "语音输入已禁用";
        readonly textInput: "文字输入";
        readonly stopRecording: "停止录音";
        readonly startRecording: "开始录音";
    };
    readonly pbl: {
        readonly legacyFormat: "此PBL场景使用旧格式，请重新生成课程";
        readonly emptyProject: "PBL项目尚未生成，请通过课程生成创建";
        readonly roleSelection: {
            readonly title: "选择你的角色";
            readonly description: "选择一个角色开始项目协作";
        };
        readonly workspace: {
            readonly restart: "重新开始";
            readonly confirmRestart: "确定重置进度？";
            readonly confirm: "确定";
            readonly cancel: "取消";
        };
        readonly issueboard: {
            readonly title: "任务看板";
            readonly noIssues: "暂无任务";
            readonly statusDone: "已完成";
            readonly statusActive: "进行中";
            readonly statusPending: "待处理";
        };
        readonly chat: {
            readonly title: "项目讨论";
            readonly currentIssue: "当前任务";
            readonly mentionHint: "使用 @question 提问，@judge 提交评审";
            readonly placeholder: "输入消息...";
            readonly send: "发送";
            readonly welcomeMessage: "你好！我是本任务的提问助手，当前任务：「{title}」\n\n为了帮助你开展工作，我准备了一些引导问题：\n\n{questions}\n\n随时可以 @question 向我提问！";
            readonly issueCompleteMessage: "任务「{completed}」已完成！进入下一个任务：「{next}」";
            readonly allCompleteMessage: "🎉 所有任务都已完成！项目做得很棒！";
        };
        readonly guide: {
            readonly howItWorks: "如何参与项目";
            readonly help: "使用帮助";
            readonly title: "使用帮助";
            readonly step1: {
                readonly title: "第一步：选择角色";
                readonly desc: "项目生成后，从角色列表中选择一个角色（标记为🟢的非系统角色）";
            };
            readonly step2: {
                readonly title: "第二步：完成任务";
                readonly desc: "每个任务代表一个学习目标：";
                readonly s1: {
                    readonly title: "查看当前任务";
                    readonly desc: "查看任务的标题、描述、负责人";
                };
                readonly s2: {
                    readonly title: "获取指导";
                    readonly example: "@question 我应该从哪里开始？\n@question 如何实现这个功能？";
                    readonly desc: "提问助手会提供引导性问题和提示（不直接给答案）";
                };
                readonly s3: {
                    readonly title: "提交作品";
                    readonly example: "@judge 我已经完成了，请检查";
                    readonly desc: "评审助手会评估你的工作并给出反馈：";
                    readonly complete: "自动进入下一个任务";
                    readonly revision: "根据反馈改进";
                };
            };
            readonly step3: {
                readonly title: "第三步：完成项目";
                readonly desc: "所有任务完成后，系统会显示「🎉 项目已完成！」";
            };
        };
    };
    readonly share: {
        readonly notReady: "生成完成后可分享";
    };
};
export declare const stageEnUS: {
    readonly stage: {
        readonly currentScene: "Current Scene";
        readonly generating: "Generating...";
        readonly paused: "Paused";
        readonly generationFailed: "Generation failed";
        readonly confirmSwitchTitle: "Switch Scene";
        readonly confirmSwitchMessage: "A topic is currently in progress. Switching scenes will end the current topic. Are you sure?";
        readonly generatingNextPage: "Scene is being generated, please wait...";
        readonly fullscreen: "Fullscreen";
        readonly exitFullscreen: "Exit Fullscreen";
    };
    readonly whiteboard: {
        readonly title: "Interactive Whiteboard";
        readonly open: "Open Whiteboard";
        readonly clear: "Clear Whiteboard";
        readonly minimize: "Minimize Whiteboard";
        readonly ready: "Whiteboard is ready";
        readonly readyHint: "Elements will appear here when added by AI";
        readonly clearSuccess: "Whiteboard cleared successfully";
        readonly clearError: "Failed to clear whiteboard: ";
        readonly resetView: "Reset View";
        readonly restoreError: "Failed to restore whiteboard: ";
        readonly history: "History";
        readonly restore: "Restore";
        readonly noHistory: "No history yet";
        readonly restored: "Whiteboard restored";
        readonly elementCount: "{count} elements";
    };
    readonly quiz: {
        readonly title: "Quiz";
        readonly subtitle: "Test your knowledge";
        readonly questionsCount: "questions";
        readonly totalPrefix: "";
        readonly pointsSuffix: "pts";
        readonly startQuiz: "Start Quiz";
        readonly multipleChoiceHint: "(Multiple choice — select all correct answers)";
        readonly inputPlaceholder: "Type your answer here...";
        readonly charCount: "chars";
        readonly yourAnswer: "Your answer:";
        readonly notAnswered: "Not answered";
        readonly aiComment: "AI Feedback";
        readonly singleChoice: "Single";
        readonly multipleChoice: "Multiple";
        readonly shortAnswer: "Short answer";
        readonly analysis: "Analysis: ";
        readonly excellent: "Excellent!";
        readonly keepGoing: "Keep going!";
        readonly needsReview: "Needs review";
        readonly correct: "correct";
        readonly incorrect: "incorrect";
        readonly answering: "In Progress";
        readonly submitAnswers: "Submit Answers";
        readonly aiGrading: "AI is grading...";
        readonly aiGradingWait: "Please wait, analyzing your answers";
        readonly quizReport: "Quiz Report";
        readonly retry: "Retry";
    };
    readonly roundtable: {
        readonly teacher: "TEACHER";
        readonly you: "YOU";
        readonly inputPlaceholder: "Type your message...";
        readonly listening: "Listening...";
        readonly processing: "Processing...";
        readonly noSpeechDetected: "No speech detected, please try again";
        readonly discussionEnded: "Discussion ended";
        readonly qaEnded: "Q&A ended";
        readonly thinking: "Thinking";
        readonly yourTurn: "Your turn";
        readonly stopDiscussion: "Stop Discussion";
        readonly autoPlay: "Auto-play";
        readonly autoPlayOff: "Stop auto-play";
        readonly speed: "Speed";
        readonly voiceInput: "Voice input";
        readonly voiceInputDisabled: "Voice input disabled";
        readonly textInput: "Text input";
        readonly stopRecording: "Stop recording";
        readonly startRecording: "Start recording";
    };
    readonly pbl: {
        readonly legacyFormat: "This PBL scene uses a legacy format. Please regenerate the course.";
        readonly emptyProject: "PBL project has not been generated yet. Please create via course generation.";
        readonly roleSelection: {
            readonly title: "Choose Your Role";
            readonly description: "Select a role to start collaborating on the project";
        };
        readonly workspace: {
            readonly restart: "Restart";
            readonly confirmRestart: "Reset all progress?";
            readonly confirm: "Confirm";
            readonly cancel: "Cancel";
        };
        readonly issueboard: {
            readonly title: "Issue Board";
            readonly noIssues: "No issues yet";
            readonly statusDone: "Done";
            readonly statusActive: "Active";
            readonly statusPending: "Pending";
        };
        readonly chat: {
            readonly title: "Project Discussion";
            readonly currentIssue: "Current Issue";
            readonly mentionHint: "Use @question to ask, @judge to submit for review";
            readonly placeholder: "Type a message...";
            readonly send: "Send";
            readonly welcomeMessage: "Hello! I'm your Question Agent for this issue: \"{title}\"\n\nTo help guide your work, I've prepared some questions for you:\n\n{questions}\n\nFeel free to @question me anytime if you need help or clarification!";
            readonly issueCompleteMessage: "Issue \"{completed}\" completed! Moving to next issue: \"{next}\"";
            readonly allCompleteMessage: "🎉 All issues completed! Great work on the project!";
        };
        readonly guide: {
            readonly howItWorks: "How it works";
            readonly help: "Help";
            readonly title: "Help";
            readonly step1: {
                readonly title: "Step 1: Choose a Role";
                readonly desc: "After the project is generated, select a role from the list (non-system roles marked with 🟢)";
            };
            readonly step2: {
                readonly title: "Step 2: Complete Issues";
                readonly desc: "Each issue represents a learning task:";
                readonly s1: {
                    readonly title: "View current Issue";
                    readonly desc: "Check the issue's title, description, and assignee";
                };
                readonly s2: {
                    readonly title: "Get guidance";
                    readonly example: "@question Where should I start?\n@question How do I implement this feature?";
                    readonly desc: "The Question Agent provides guiding questions and hints (no direct answers)";
                };
                readonly s3: {
                    readonly title: "Submit your work";
                    readonly example: "@judge I'm done, please check my Notes";
                    readonly desc: "The Judge Agent evaluates your work and gives feedback:";
                    readonly complete: "Automatically moves to the next issue";
                    readonly revision: "Improve based on feedback";
                };
            };
            readonly step3: {
                readonly title: "Step 3: Complete the Project";
                readonly desc: "When all issues are done, the system displays \"🎉 Project Complete!\"";
            };
        };
    };
    readonly share: {
        readonly notReady: "Available after generation completes";
    };
};
//# sourceMappingURL=stage.d.ts.map