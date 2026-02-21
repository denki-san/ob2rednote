/**
 * 模板管理模块
 */

// 内置模板数据
const templates = {
    default: {
        id: 'default',
        name: '默认主题',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #1c1c1e; padding: 20px 12px;',
            header: {
                userName: 'font-size: 16px; font-weight: 600; color: #ffffff;'
            },
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; gap: 14px; padding: 16px; color: #98989d; font-size: 13px; border-top: 1px solid #2c2c2e; background: #1c1c1e;'
            },
            title: {
                h1: { base: 'margin: 0 0 16px 0; font-size: 1.6em; letter-spacing: -0.01em; line-height: 1.4;', content: 'font-weight: 700; color: #f2f2f7;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; letter-spacing: -0.01em; line-height: 1.5;', content: 'font-weight: 600; color: #f2f2f7;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.5;', content: 'font-weight: 600; color: #f2f2f7;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: #f2f2f7;',
            emphasis: {
                strong: 'font-weight: 700; color: #0A84FF;',
                em: 'font-style: normal; color: #98989d; background: rgba(152,152,157,0.1); padding: 0 4px;'
            },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #d1d1d6;',
                item: 'margin-bottom: 0.6em; color: #d1d1d6; line-height: 1.75;'
            },
            code: {
                block: 'background: #2c2c2e; padding: 1em; border-radius: 12px; font-size: 14px; font-family: "SF Mono", Menlo, monospace; line-height: 1.6; white-space: pre-wrap; color: #ffffff; margin: 1em 0;',
                inline: 'background: #2c2c2e; padding: 2px 6px; border-radius: 4px; color: #ff6b6b; font-size: 0.9em; font-family: "SF Mono", Menlo, monospace;'
            },
            quote: 'border-left: 3px solid #0A84FF; padding: 0 0 0 16px; margin: 1em 0; color: #f2f2f7; font-size: 15px; line-height: 1.75;',
            image: 'max-width: 100%; height: auto; margin: 2px auto 0 auto; border-radius: 12px; display: block;',
            link: 'color: #0A84FF; text-decoration: underline;',
            table: {
                container: 'width: 100%; margin: 1em 0; border-collapse: collapse; border-radius: 8px; overflow: hidden;',
                header: 'background: #2c2c2e; font-weight: 600; color: #f2f2f7; padding: 10px;',
                cell: 'padding: 10px; color: #d1d1d6; border-top: 1px solid #2c2c2e;'
            },
            callouts: {
                'NOTE': { bg: 'rgba(30, 58, 95, 0.4)', border: 'rgba(59, 130, 246, 0.3)', color: '#3b82f6' },
                'TIP': { bg: 'rgba(26, 61, 46, 0.4)', border: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' },
                'IMPORTANT': { bg: 'rgba(61, 31, 92, 0.4)', border: 'rgba(168, 85, 247, 0.3)', color: '#a855f7' },
                'WARNING': { bg: 'rgba(92, 61, 30, 0.4)', border: 'rgba(245, 158, 11, 0.3)', color: '#f59e0b' },
                'CAUTION': { bg: 'rgba(92, 26, 26, 0.4)', border: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' },
                'INFO': { bg: 'rgba(22, 78, 99, 0.4)', border: 'rgba(6, 182, 212, 0.3)', color: '#06b6d4' }
            }
        }
    },
    elegant: {
        id: 'elegant',
        name: '优雅',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px 12px;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; padding: 16px; color: rgba(255,255,255,0.7); font-size: 13px; background: rgba(0,0,0,0.1);'
            },
            title: {
                h1: { base: 'margin: 0 0 16px 0; font-size: 1.6em; line-height: 1.4;', content: 'font-weight: 700; color: #ffffff;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 600; color: #ffffff;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: rgba(255,255,255,0.95);',
            emphasis: {
                strong: 'font-weight: 700; color: #ffd700;'
            },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: rgba(255,255,255,0.9);',
                item: 'margin-bottom: 0.6em; line-height: 1.75;'
            },
            code: {
                block: 'background: rgba(0,0,0,0.2); padding: 1em; border-radius: 12px; color: #ffffff; margin: 1em 0;',
                inline: 'background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; color: #ffd700;'
            },
            quote: 'border-left: 3px solid #ffd700; padding-left: 16px; margin: 1em 0; color: rgba(255,255,255,0.9);',
            image: 'max-width: 100%; border-radius: 12px; margin: 2px auto 0 auto; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.2);',
            callouts: {
                'NOTE': { bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' },
                'TIP': { bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' },
                'IMPORTANT': { bg: 'rgba(255, 255, 255, 0.15)', border: 'rgba(255, 215, 0, 0.3)', color: '#ffd700' },
                'WARNING': { bg: 'rgba(255, 255, 255, 0.15)', border: 'rgba(255, 165, 0, 0.3)', color: '#ffd700' },
                'CAUTION': { bg: 'rgba(255, 0, 0, 0.1)', border: 'rgba(255, 0, 0, 0.2)', color: '#ffcccb' },
                'INFO': { bg: 'rgba(255, 255, 255, 0.1)', border: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }
            }
        }
    },
    cyber: {
        id: 'cyber',
        name: '赛博',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%); padding: 20px 12px;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; padding: 16px; color: #00ff88; font-size: 13px; background: rgba(0,0,0,0.3); border-top: 1px solid #00ff8855;'
            },
            title: {
                h1: { base: 'margin: 0 0 16px 0; font-size: 1.6em; line-height: 1.4;', content: 'font-weight: 700; color: #00ff88; text-shadow: 0 0 10px #00ff8855;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 600; color: #00ff88;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: #e0e0e0;',
            emphasis: {
                strong: 'font-weight: 700; color: #ff00ff; text-shadow: 0 0 5px #ff00ff55;'
            },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #e0e0e0;',
                item: 'margin-bottom: 0.6em; line-height: 1.75;'
            },
            code: {
                block: 'background: rgba(0,255,136,0.1); padding: 1em; border-radius: 8px; border: 1px solid #00ff8833; color: #00ff88; margin: 1em 0;',
                inline: 'background: rgba(0,255,136,0.1); padding: 2px 6px; border-radius: 4px; color: #00ff88;'
            },
            quote: 'border-left: 3px solid #ff00ff; padding-left: 16px; margin: 1em 0; color: #e0e0e0;',
            image: 'max-width: 100%; border-radius: 8px; margin: 2px auto 0 auto; display: block; border: 1px solid #00ff8833;',
            callouts: {
                'NOTE': { bg: 'rgba(0, 0, 50, 0.6)', border: '#00f', color: '#00f' },
                'TIP': { bg: 'rgba(0, 50, 0, 0.6)', border: '#00ff88', color: '#00ff88' },
                'IMPORTANT': { bg: 'rgba(50, 0, 50, 0.6)', border: '#ff00ff', color: '#ff00ff' },
                'WARNING': { bg: 'rgba(50, 50, 0, 0.6)', border: '#ffff00', color: '#ffff00' },
                'CAUTION': { bg: 'rgba(50, 0, 0, 0.6)', border: '#ff0000', color: '#ff0000' },
                'INFO': { bg: 'rgba(0, 50, 50, 0.6)', border: '#00ffff', color: '#00ffff' }
            }
        }
    },
    forest: {
        id: 'forest',
        name: '森林',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); padding: 20px 12px;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; padding: 16px; color: rgba(255,255,255,0.8); font-size: 13px; background: rgba(0,0,0,0.15);'
            },
            title: {
                h1: { base: 'margin: 0 0 16px 0; font-size: 1.6em; line-height: 1.4;', content: 'font-weight: 700; color: #ffffff;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 600; color: #ffffff;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: rgba(255,255,255,0.95);',
            emphasis: { strong: 'font-weight: 700; color: #a8e063;' },
            list: { container: 'padding-left: 24px; margin-bottom: 1em; color: rgba(255,255,255,0.9);' },
            code: {
                block: 'background: rgba(0,0,0,0.2); padding: 1em; border-radius: 12px; color: #a8e063; margin: 1em 0;',
                inline: 'background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; color: #a8e063;'
            },
            quote: 'border-left: 3px solid #a8e063; padding-left: 16px; margin: 1em 0; color: rgba(255,255,255,0.9);',
            image: 'max-width: 100%; border-radius: 12px; margin: 2px auto 0 auto; display: block;'
        }
    },
    ocean: {
        id: 'ocean',
        name: '海洋',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: linear-gradient(135deg, #1a2980 0%, #26d0ce 100%); padding: 20px 12px;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; padding: 16px; color: rgba(255,255,255,0.8); font-size: 13px; background: rgba(0,0,0,0.15);'
            },
            title: {
                h1: { base: 'margin: 0 0 16px 0; font-size: 1.6em; line-height: 1.4;', content: 'font-weight: 700; color: #ffffff;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 600; color: #ffffff;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: rgba(255,255,255,0.95);',
            emphasis: { strong: 'font-weight: 700; color: #7dd3fc;' },
            code: {
                block: 'background: rgba(0,0,0,0.2); padding: 1em; border-radius: 12px; color: #7dd3fc; margin: 1em 0;',
                inline: 'background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; color: #7dd3fc;'
            },
            quote: 'border-left: 3px solid #7dd3fc; padding-left: 16px; margin: 1em 0; color: rgba(255,255,255,0.9);',
            image: 'max-width: 100%; border-radius: 12px; margin: 2px auto 0 auto; display: block;'
        }
    },
    sakura: {
        id: 'sakura',
        name: '樱花',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 20px 12px;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: center; padding: 16px; color: #8b5a5a; font-size: 13px; background: rgba(255,255,255,0.3);'
            },
            title: {
                h1: { base: 'margin: 0 0 16px 0; font-size: 1.6em; line-height: 1.4;', content: 'font-weight: 700; color: #8b4a5a;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 600; color: #8b5a5a;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: #5a4a4a;',
            emphasis: { strong: 'font-weight: 700; color: #d4748a;' },
            code: {
                block: 'background: rgba(255,255,255,0.5); padding: 1em; border-radius: 12px; color: #8b5a5a; margin: 1em 0;',
                inline: 'background: rgba(255,255,255,0.5); padding: 2px 6px; border-radius: 4px; color: #d4748a;'
            },
            quote: 'border-left: 3px solid #d4748a; padding-left: 16px; margin: 1em 0; color: #5a4a4a;',
            image: 'max-width: 100%; border-radius: 12px; margin: 2px auto 0 auto; display: block; box-shadow: 0 4px 15px rgba(0,0,0,0.1);',
            callouts: {
                'NOTE': { bg: 'rgba(255, 255, 255, 0.4)', border: '#d4748a', color: '#d4748a' },
                'TIP': { bg: 'rgba(255, 255, 255, 0.4)', border: '#d4748a', color: '#d4748a' },
                'IMPORTANT': { bg: 'rgba(255, 255, 255, 0.5)', border: '#c084fc', color: '#c084fc' },
                'WARNING': { bg: 'rgba(255, 255, 255, 0.5)', border: '#fcd34d', color: '#fcd34d' },
                'CAUTION': { bg: 'rgba(255, 200, 200, 0.4)', border: '#f87171', color: '#f87171' },
                'INFO': { bg: 'rgba(255, 255, 255, 0.4)', border: '#d4748a', color: '#d4748a' }
            }
        }
    },
    techMinimal: {
        id: 'techMinimal',
        name: '极简科技 (Consultant)',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #faf8f5; padding: 20px 12px; color: #111111;',
            footer: {
                container: 'display: none;'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 1.6em; line-height: 1.2;', content: 'font-weight: 800; color: #111; letter-spacing: -0.03em; border-left: 8px solid #0041C2; padding-left: 20px;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.5em; line-height: 1.3;', content: 'font-weight: 700; color: #111; letter-spacing: -0.02em; border-left: 6px solid #0041C2; padding-left: 16px;' },
                h3: { base: 'margin: 24px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-weight: 600; color: #111; border-left: 4px solid #0041C2; padding-left: 12px;' }
            },
            paragraph: 'line-height: 1.7; margin-bottom: 0.5em; color: #333333; font-weight: 400;',
            emphasis: { strong: 'font-weight: 700; color: #0041C2;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #333;',
                item: 'margin-bottom: 0.5em; line-height: 1.6;'
            },
            code: {
                block: 'background: #f4f4f5; padding: 1.2em; border-radius: 4px; border-left: 4px solid #0041C2; font-family: "SF Mono", Menlo, monospace; font-size: 13px; color: #333; margin: 1.5em 0;',
                inline: 'background: #f4f4f5; padding: 2px 6px; border-radius: 2px; color: #0041C2; font-weight: 500;'
            },
            quote: 'border-left: 4px solid #000; padding-left: 20px; margin: 1.5em 0; font-style: italic; color: #555;',
            image: 'max-width: 100%; border-radius: 12px; margin: 1em auto; display: block; border: 1px solid #eee;',
            callouts: {
                'NOTE': { bg: '#f0f4ff', border: '#0041C2', color: '#0041C2' },
                'TIP': { bg: '#f0fff4', border: '#22c55e', color: '#22c55e' },
                'IMPORTANT': { bg: '#fdf4ff', border: '#a855f7', color: '#a855f7' },
                'WARNING': { bg: '#fff0e6', border: '#f59e0b', color: '#f59e0b' },
                'CAUTION': { bg: '#fff0f0', border: '#ef4444', color: '#ef4444' },
                'INFO': { bg: '#f0f4ff', border: '#0041C2', color: '#0041C2' }
            }
        }
    },
    deepTech: {
        id: 'deepTech',
        name: '深邃工程 (Engineer)',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #0d1117; padding: 20px 12px; color: #c9d1d9;',
            footer: {
                container: 'display: none;'
            },
            title: {
                h1: { base: 'margin: 0 0 20px 0; font-size: 1.8em; line-height: 1.4;', content: 'font-family: "JetBrains Mono", "SF Mono", monospace; font-weight: 700; color: #58a6ff; border-bottom: 1px solid #30363d; padding-bottom: 10px;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.4em; line-height: 1.4;', content: 'font-family: "JetBrains Mono", "SF Mono", monospace; font-weight: 600; color: #7ee787;' },
                h3: { base: 'margin: 24px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-family: "JetBrains Mono", "SF Mono", monospace; font-weight: 600; color: #ff7b72;' }
            },
            paragraph: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; line-height: 1.8; margin-bottom: 0.5em; color: #c9d1d9;',
            emphasis: { strong: 'font-weight: 700; color: #79c0ff;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #c9d1d9;',
                item: 'margin-bottom: 0.5em; line-height: 1.7;'
            },
            code: {
                block: 'background: #161b22; padding: 1em; border-radius: 6px; border: 1px solid #30363d; font-family: "JetBrains Mono", "SF Mono", monospace; font-size: 13px; color: #c9d1d9; margin: 1em 0;',
                inline: 'background: rgba(110,118,129,0.4); padding: 2px 6px; border-radius: 4px; color: #ff7b72; font-family: "JetBrains Mono", monospace;'
            },
            quote: 'border-left: 3px solid #30363d; padding-left: 16px; margin: 1em 0; color: #8b949e;',
            image: 'max-width: 100%; border-radius: 6px; margin: 1em auto; display: block; border: 1px solid #30363d;',
            callouts: {
                'NOTE': { bg: 'rgba(56, 139, 253, 0.15)', border: 'rgba(56, 139, 253, 0.4)', color: '#58a6ff' },
                'TIP': { bg: 'rgba(46, 160, 67, 0.15)', border: 'rgba(46, 160, 67, 0.4)', color: '#3fb950' },
                'IMPORTANT': { bg: 'rgba(163, 113, 247, 0.15)', border: 'rgba(163, 113, 247, 0.4)', color: '#d2a8ff' },
                'WARNING': { bg: 'rgba(187, 128, 9, 0.15)', border: 'rgba(187, 128, 9, 0.4)', color: '#d29922' },
                'CAUTION': { bg: 'rgba(248, 81, 73, 0.15)', border: 'rgba(248, 81, 73, 0.4)', color: '#f85149' },
                'INFO': { bg: 'rgba(56, 139, 253, 0.15)', border: 'rgba(56, 139, 253, 0.4)', color: '#58a6ff' }
            }
        }
    },
    structural: {
        id: 'structural',
        name: '结构主义 (Architect)',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #f7f7f7; background-image: linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px); background-size: 20px 20px; padding: 20px 12px; color: #2c2c2e;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 12px; font-size: 12px; color: #888; text-align: center; border-top: 2px solid #2c2c2e; background: #f7f7f7;'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 2em; line-height: 1.3; text-align: center;', content: 'font-family: "Songti SC", "Noto Serif SC", serif; font-weight: 900; color: #000; border-top: 3px solid #000; border-bottom: 3px solid #000; padding: 16px 0;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.4em; line-height: 1.4;', content: 'font-family: "Songti SC", "Noto Serif SC", serif; font-weight: 700; color: #000; border-bottom: 1px solid #999; display: inline-block; padding-bottom: 4px;' },
                h3: { base: 'margin: 24px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-family: "Songti SC", serif; font-weight: 700; color: #333;' }
            },
            paragraph: 'font-family: "Songti SC", "Noto Serif SC", serif; line-height: 1.7; margin-bottom: 0.5em; color: #333; text-align: justify;',
            emphasis: { strong: 'font-weight: 800; color: #000; text-decoration: underline; text-decoration-color: #000;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #333; font-family: "Songti SC", serif;',
                item: 'margin-bottom: 0.5em; line-height: 1.8;'
            },
            code: {
                block: 'background: #fff; padding: 1em; border: 1px solid #000; border-radius: 0; font-family: "SF Mono", monospace; color: #000; margin: 1em 0; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);',
                inline: 'background: #eee; padding: 2px 6px; border-radius: 0; color: #000; border: 1px solid #ccc;'
            },
            quote: 'border-left: 4px solid #000; background: #fff; padding: 16px; margin: 1.5em 0; font-family: "Songti SC", serif; color: #000; border: 1px solid #000;',
            image: 'max-width: 100%; border-radius: 0; margin: 1em auto; display: block; border: none; padding: 0; background: transparent;',
            callouts: {
                'NOTE': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'TIP': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'IMPORTANT': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'WARNING': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'CAUTION': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'INFO': { bg: '#ffffff', border: '#000000', color: '#000000' }
            }
        }
    }
}

/**
 * 获取模板列表
 */
export function getTemplateList() {
    return Object.values(templates).map(t => ({ id: t.id, name: t.name }))
}

/**
 * 加载模板
 */
export async function loadTemplate(templateId) {
    return templates[templateId] || templates.default
}

/**
 * 应用模板样式到预览元素
 */
export function applyTemplate(imagePreview, template, settings) {
    const styles = template.styles

    // 先清除容器的背景和 padding 样式，避免累积
    imagePreview.style.backgroundColor = ''
    imagePreview.style.background = ''
    imagePreview.style.padding = ''

    // 应用容器样式
    if (styles.imagePreview) {
        imagePreview.style.cssText = styles.imagePreview
    }

    // 应用页脚样式
    const footer = imagePreview.querySelector('.red-preview-footer')
    if (footer) {
        footer.style.cssText = ''
        if (styles.footer?.container) {
            footer.style.cssText = styles.footer.container
        }
    }

    // 应用标题样式
    const headingLevel = settings.headingLevel || 'h1'
    imagePreview.querySelectorAll('h1, h2, h3').forEach(h => {
        const level = h.tagName.toLowerCase()
        const titleStyle = styles.title?.[level] || styles.title?.h2
        if (titleStyle) {
            h.style.cssText = (titleStyle.base || '') + (titleStyle.content || '')
        }
    })

    // 应用段落样式（排除只包含图片的段落）
    imagePreview.querySelectorAll('p').forEach(p => {
        if (styles.paragraph) {
            // 检查是否只包含图片
            const hasOnlyImage = p.children.length === 1 && p.children[0].tagName === 'IMG'
            if (hasOnlyImage) {
                // 只包含图片的段落，不应用段落样式，保持 margin: 0
                p.style.marginBottom = '0'
            } else {
                p.style.cssText = styles.paragraph
            }
        }
    })

    // 应用强调样式
    if (styles.emphasis) {
        imagePreview.querySelectorAll('strong').forEach(el => {
            if (styles.emphasis.strong) el.style.cssText = styles.emphasis.strong
        })
        imagePreview.querySelectorAll('em').forEach(el => {
            if (styles.emphasis.em) el.style.cssText = styles.emphasis.em
        })
    }

    // 应用列表样式
    if (styles.list) {
        imagePreview.querySelectorAll('ul, ol').forEach(list => {
            list.style.cssText = ''
            if (styles.list.container) list.style.cssText = styles.list.container
        })
        imagePreview.querySelectorAll('li').forEach(li => {
            li.style.cssText = ''
            if (styles.list.item) li.style.cssText = styles.list.item
        })
    }

    // 应用代码样式
    if (styles.code) {
        imagePreview.querySelectorAll('pre').forEach(pre => {
            if (styles.code.block) pre.style.cssText = styles.code.block
        })
        imagePreview.querySelectorAll('code').forEach(code => {
            if (!code.parentElement?.tagName?.toLowerCase() === 'pre') {
                code.style.cssText = ''
                if (styles.code.inline) code.style.cssText = styles.code.inline
            }
        })
        // 单独处理行内代码
        imagePreview.querySelectorAll('.red-inline-code').forEach(code => {
            if (styles.code.inline) code.style.cssText = styles.code.inline
        })
    }

    // 应用引用样式
    if (styles.quote) {
        imagePreview.querySelectorAll('blockquote').forEach(bq => {
            bq.style.cssText = styles.quote
        })
    }

    // 应用图片样式
    if (styles.image) {
        imagePreview.querySelectorAll('img').forEach(img => {
            // 先应用主题的图片样式
            let imageStyle = styles.image
            // 如果用户选择无阴影，移除样式中的 box-shadow
            if (settings.imageShadow === 'none') {
                imageStyle = imageStyle.replace(/box-shadow:[^;]+;?/g, '')
                // 无阴影时去掉边距，让图片撑满
                imageStyle = imageStyle.replace(/margin:[^;]+;?/g, 'margin: 0 auto;')
            }
            img.style.cssText = imageStyle
        })
    }

    // 应用 Callout 样式
    if (styles.callouts) {
        imagePreview.querySelectorAll('.red-callout').forEach(callout => {
            const type = callout.dataset.type
            const calloutStyle = styles.callouts[type] || styles.callouts['NOTE'] // 默认降级到 NOTE

            if (calloutStyle) {
                // 应用背景色和边框
                callout.style.backgroundColor = calloutStyle.bg
                callout.style.border = `1px solid ${calloutStyle.border || calloutStyle.color}`

                // 应用标题/图标颜色
                const header = callout.querySelector('.red-callout-header')
                if (header) {
                    header.style.color = calloutStyle.color
                }
            }
        })
    }

    // 应用字号（在段落样式之后，确保字号生效）
    const fontSize = settings.fontSize || 16
    imagePreview.style.setProperty('--content-font-size', `${fontSize}px`)
    imagePreview.querySelectorAll('p, li').forEach(el => {
        el.style.fontSize = `${fontSize}px`
    })
}
