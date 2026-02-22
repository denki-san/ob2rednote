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

    cream: {
        id: 'cream',
        name: '奶油治愈',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #faf7f2; padding: 20px 12px; color: #5a504a;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; font-size: 13px; color: #a89f91; text-align: center; background: linear-gradient(to top, rgba(250,247,242,1), rgba(250,247,242,0));'
            },
            title: {
                h1: { base: 'margin: 0 0 20px 0; font-size: 1.6em; line-height: 1.4; text-align: center;', content: 'font-weight: 700; color: #4a3f35;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.4em; line-height: 1.5; text-align: center;', content: 'font-weight: 600; color: #5a504a;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.5;', content: 'font-weight: 600; color: #6a605a;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.5em; color: #5a504a;',
            emphasis: { strong: 'font-weight: 700; color: #8e7d6a;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #5a504a;',
                item: 'margin-bottom: 0.6em; line-height: 1.75;'
            },
            code: {
                block: 'background: #f0ebe1; padding: 1em; border-radius: 12px; color: #6a605a; margin: 1em 0;',
                inline: 'background: #f0ebe1; padding: 2px 6px; border-radius: 4px; color: #8e7d6a;'
            },
            quote: 'border-left: 3px solid #d2c5b3; padding-left: 16px; margin: 1em 0; color: #7a706a; font-style: italic;',
            image: 'max-width: 100%; border-radius: 16px; margin: 2px auto 0 auto; display: block; box-shadow: 0 10px 30px rgba(110,95,80,0.08);',
            callouts: {
                'NOTE': { bg: '#f5f0e6', border: '#d2c5b3', color: '#8e7d6a' },
                'TIP': { bg: '#f0f5e6', border: '#c5d2b3', color: '#7d8e6a' },
                'IMPORTANT': { bg: '#f5e6eb', border: '#d2b3c5', color: '#8e6a7d' },
                'WARNING': { bg: '#fdf4e4', border: '#e8d0a9', color: '#d4a373' },
                'CAUTION': { bg: '#fdeae4', border: '#e8a9a9', color: '#d47373' },
                'INFO': { bg: '#e4f4fd', border: '#a9d0e8', color: '#73a3d4' }
            }
        }
    },
    brutalist: {
        id: 'brutalist',
        name: '极简粗野',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #000000; padding: 20px 12px; color: #ffffff;',
            footer: {
                container: 'display: none;'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 2.2em; line-height: 1.1; text-transform: uppercase;', content: 'font-weight: 900; color: #ffffff; letter-spacing: -0.02em;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.6em; line-height: 1.2;', content: 'font-weight: 800; color: #ffff00; text-transform: uppercase;' },
                h3: { base: 'margin: 24px 0 12px; font-size: 1.3em; line-height: 1.3;', content: 'font-weight: 700; color: #ffffff;' }
            },
            paragraph: 'line-height: 1.5; margin-bottom: 0.8em; color: #ffffff; font-size: 1.1em; font-weight: 500;',
            emphasis: { strong: 'font-weight: 900; color: #000000; background: #ffff00; padding: 0 4px;' },
            list: {
                container: 'padding-left: 20px; margin-bottom: 1em; color: #ffffff; list-style-type: square;',
                item: 'margin-bottom: 0.5em; line-height: 1.5; font-weight: 500;'
            },
            code: {
                block: 'background: #222222; padding: 1.2em; border: 2px solid #ffffff; border-radius: 0; color: #00ff00; margin: 1em 0; font-family: monospace; font-size: 1.1em;',
                inline: 'background: #ffffff; padding: 2px 6px; border-radius: 0; color: #000000; font-family: monospace; font-weight: bold;'
            },
            quote: 'border: 2px solid #ffffff; background: #ffff00; padding: 16px; margin: 1.5em 0; color: #000000; font-weight: 700; font-size: 1.2em;',
            image: 'max-width: 100%; border-radius: 0; margin: 1em auto; display: block; border: 2px solid #ffffff; filter: grayscale(20%) contrast(120%);',
            callouts: {
                'NOTE': { bg: '#222222', border: '#ffffff', color: '#ffffff' },
                'TIP': { bg: '#ffff00', border: '#ffffff', color: '#000000' },
                'IMPORTANT': { bg: '#ff00ff', border: '#ffffff', color: '#ffffff' },
                'WARNING': { bg: '#00ffff', border: '#ffffff', color: '#000000' },
                'CAUTION': { bg: '#ff0000', border: '#ffffff', color: '#ffffff' },
                'INFO': { bg: '#0000ff', border: '#ffffff', color: '#ffffff' }
            }
        }
    },
    vintage: {
        id: 'vintage',
        name: '复古胶片',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #eaddcf; padding: 30px 20px; color: #2b2520; box-shadow: inset 0 0 100px rgba(100,60,30,0.1);',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; font-size: 14px; color: #8c7d6b; text-align: center; font-family: "Times New Roman", Times, serif; font-style: italic; letter-spacing: 0.1em;'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 1.8em; line-height: 1.3; text-align: center;', content: 'font-family: inherit; font-weight: 700; color: #7f2b2b; letter-spacing: 0.05em;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.5em; line-height: 1.4;', content: 'font-weight: 700; color: #234236;' },
                h3: { base: 'margin: 24px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-weight: 600; color: #6b4d32;' }
            },
            paragraph: 'line-height: 1.9; margin-bottom: 0.8em; color: #3a322c; text-indent: 1em;',
            emphasis: { strong: 'font-weight: 700; color: #7f2b2b;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #3a322c;',
                item: 'margin-bottom: 0.6em; line-height: 1.8;'
            },
            code: {
                block: 'background: rgba(43,37,32,0.05); padding: 1.2em; border: 1px dashed #a89a8c; border-radius: 4px; color: #5c4d3c; margin: 1em 0; font-family: "Courier New", Courier, monospace;',
                inline: 'background: rgba(43,37,32,0.08); padding: 2px 6px; border-radius: 2px; color: #7f2b2b; font-family: "Courier New", monospace;'
            },
            quote: 'border-left: 0; border-top: 2px solid #8c7d6b; border-bottom: 2px solid #8c7d6b; padding: 16px 0; margin: 1.5em 0; color: #5c4d3c; font-style: italic; text-align: center; font-size: 1.1em;',
            image: 'max-width: 100%; border-radius: 2px; margin: 1.5em auto; display: block; border: 8px solid #f7f3ec; box-shadow: 2px 2px 10px rgba(0,0,0,0.15); filter: sepia(0.2) contrast(1.1);',
            callouts: {
                'NOTE': { bg: 'rgba(255,255,255,0.4)', border: '#8c7d6b', color: '#5c4d3c' },
                'TIP': { bg: 'rgba(35,66,54,0.1)', border: '#234236', color: '#234236' },
                'IMPORTANT': { bg: 'rgba(127,43,43,0.1)', border: '#7f2b2b', color: '#7f2b2b' },
                'WARNING': { bg: 'rgba(200,140,50,0.1)', border: '#c88c32', color: '#96641e' },
                'CAUTION': { bg: 'rgba(127,43,43,0.15)', border: '#7f2b2b', color: '#7f2b2b' },
                'INFO': { bg: 'rgba(50,80,120,0.1)', border: '#325078', color: '#325078' }
            }
        }
    },
    wabisabi: {
        id: 'wabisabi',
        name: '侘寂素雅',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #d1cbbd; padding: 24px 16px; color: #4a443b; font-weight: 300;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; font-size: 12px; color: #7a7366; text-align: center; letter-spacing: 0.1em;'
            },
            title: {
                h1: { base: 'margin: 0 0 20px 0; font-size: 1.5em; line-height: 1.5; text-align: center;', content: 'font-weight: 500; color: #2d2a24; letter-spacing: 0.05em;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.3em; line-height: 1.5;', content: 'font-weight: 500; color: #3d3830;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.1em; line-height: 1.6;', content: 'font-weight: 500; color: #4a443b;' }
            },
            paragraph: 'line-height: 2; margin-bottom: 0.8em; color: #4a443b;',
            emphasis: { strong: 'font-weight: 500; color: #1a1815; background: rgba(0,0,0,0.05); padding: 0 4px;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #4a443b;',
                item: 'margin-bottom: 0.8em; line-height: 1.8;'
            },
            code: {
                block: 'background: rgba(255,255,255,0.3); padding: 1.2em; border-radius: 2px; color: #4a443b; margin: 1.2em 0;',
                inline: 'background: rgba(255,255,255,0.4); padding: 2px 6px; border-radius: 2px; color: #2d2a24;'
            },
            quote: 'border-left: 2px solid #8f8574; padding-left: 16px; margin: 1.5em 0; color: #7a7366; font-style: italic;',
            image: 'max-width: 100%; border-radius: 4px; margin: 1em auto; display: block; filter: sepia(0.1) brightness(0.95);',
            callouts: {
                'NOTE': { bg: 'rgba(255,255,255,0.2)', border: '#8f8574', color: '#4a443b' },
                'TIP': { bg: 'rgba(255,255,255,0.2)', border: '#8f8574', color: '#4a443b' },
                'IMPORTANT': { bg: 'rgba(255,255,255,0.2)', border: '#8f8574', color: '#4a443b' },
                'WARNING': { bg: 'rgba(255,255,255,0.2)', border: '#8f8574', color: '#4a443b' },
                'CAUTION': { bg: 'rgba(255,255,255,0.2)', border: '#8f8574', color: '#4a443b' },
                'INFO': { bg: 'rgba(255,255,255,0.2)', border: '#8f8574', color: '#4a443b' }
            }
        }
    },
    y2k: {
        id: 'y2k',
        name: 'Y2K千禧',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: linear-gradient(135deg, #ff00cc 0%, #333399 100%); padding: 20px 12px; color: #ffffff;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; font-size: 13px; color: #ff99ff; text-align: center; text-shadow: 1px 1px 2px #000;'
            },
            title: {
                h1: { base: 'margin: 0 0 20px 0; font-size: 1.8em; line-height: 1.2; text-align: center; transform: skewX(-5deg);', content: 'font-weight: 900; color: #ffffff; text-shadow: 2px 2px 0px #ff00cc, 4px 4px 0px #333399;' },
                h2: { base: 'margin: 0 0 14px 0; font-size: 1.5em; line-height: 1.3;', content: 'font-weight: 800; color: #00ffff; text-shadow: 1px 1px 0px #000;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-weight: 700; color: #ff99ff;' }
            },
            paragraph: 'line-height: 1.6; margin-bottom: 0.6em; color: #ffffff; font-weight: 500; text-shadow: 0px 1px 2px rgba(0,0,0,0.5);',
            emphasis: { strong: 'font-weight: 800; color: #ffff00; text-shadow: 1px 1px 0px #ff00cc;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #ffffff; text-shadow: 0px 1px 2px rgba(0,0,0,0.5);',
                item: 'margin-bottom: 0.5em; line-height: 1.6;'
            },
            code: {
                block: 'background: rgba(0,0,0,0.6); border: 2px solid #00ffff; box-shadow: 2px 2px 0px #ff00cc; padding: 1em; border-radius: 8px; color: #00ffff; margin: 1em 0;',
                inline: 'background: #ffff00; padding: 2px 6px; border-radius: 4px; color: #000000; font-weight: bold;'
            },
            quote: 'border-left: 4px solid #00ffff; background: rgba(255,255,255,0.1); padding: 12px 16px; margin: 1em 0; color: #ffffff; font-style: italic;',
            image: 'max-width: 100%; border-radius: 12px; margin: 1em auto; display: block; border: 3px solid #00ffff; box-shadow: 4px 4px 0px #ff00cc;',
            callouts: {
                'NOTE': { bg: 'rgba(0,0,0,0.5)', border: '#00ffff', color: '#00ffff' },
                'TIP': { bg: 'rgba(0,0,0,0.5)', border: '#ffff00', color: '#ffff00' },
                'IMPORTANT': { bg: 'rgba(0,0,0,0.5)', border: '#ff00cc', color: '#ff99ff' },
                'WARNING': { bg: 'rgba(0,0,0,0.5)', border: '#ff6600', color: '#ff9900' },
                'CAUTION': { bg: 'rgba(0,0,0,0.5)', border: '#ff0000', color: '#ff0000' },
                'INFO': { bg: 'rgba(0,0,0,0.5)', border: '#333399', color: '#9999ff' }
            }
        }
    },
    editorial: {
        id: 'editorial',
        name: '杂志大片',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #ffffff; padding: 30px 20px; color: #000000;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; font-size: 11px; color: #000000; text-align: center; text-transform: uppercase; letter-spacing: 0.2em; border-top: 1px solid #000;'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 2.2em; line-height: 1.1; text-align: center;', content: 'font-weight: 900; color: #000000; font-family: "Times New Roman", Times, serif;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.5em; line-height: 1.3;', content: 'font-weight: 800; color: #000000; font-family: "Times New Roman", Times, serif;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-weight: 700; color: #000000;' }
            },
            paragraph: 'line-height: 1.7; margin-bottom: 0.8em; color: #111111; font-weight: 400;',
            emphasis: { strong: 'font-weight: 700; color: #000000; border-bottom: 2px solid #000;' },
            list: {
                container: 'padding-left: 20px; margin-bottom: 1em; color: #111111; list-style-type: disc;',
                item: 'margin-bottom: 0.5em; line-height: 1.6;'
            },
            code: {
                block: 'background: #f4f4f4; padding: 1.2em; border: 1px solid #e0e0e0; color: #333333; margin: 1em 0; font-family: monospace; font-size: 13px;',
                inline: 'background: #000000; padding: 2px 6px; color: #ffffff; font-family: monospace; font-size: 12px;'
            },
            quote: 'border-left: 4px solid #000000; padding: 0 0 0 20px; margin: 1.5em 0; color: #000000; font-style: italic; font-size: 1.3em; font-family: "Times New Roman", Times, serif;',
            image: 'max-width: 100%; margin: 1.5em auto; display: block; filter: grayscale(10%);',
            callouts: {
                'NOTE': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'TIP': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'IMPORTANT': { bg: '#000000', border: '#000000', color: '#ffffff' },
                'WARNING': { bg: '#ffffff', border: '#000000', color: '#000000' },
                'CAUTION': { bg: '#000000', border: '#000000', color: '#ffffff' },
                'INFO': { bg: '#ffffff', border: '#000000', color: '#000000' }
            }
        }
    },
    journal: {
        id: 'journal',
        name: '手账日记',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #fdfcf8; background-image: radial-gradient(#d3cabd 1px, transparent 1px); background-size: 20px 20px; padding: 24px 16px; color: #2a3441;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; font-size: 13px; color: #a4adc1; text-align: right; font-family: cursive;'
            },
            title: {
                h1: { base: 'margin: 0 0 20px 0; font-size: 1.8em; line-height: 1.4; text-align: center;', content: 'font-weight: 700; color: #2a3441; border-bottom: 2px dashed #d3cabd; padding-bottom: 8px; display: inline-block;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 700; color: #d96c75; background: rgba(217,108,117,0.1); padding: 0 8px; border-radius: 4px;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.5;', content: 'font-weight: 700; color: #528c9e;' }
            },
            paragraph: 'line-height: 2; margin-bottom: 0.8em; color: #2a3441; font-family: inherit;',
            emphasis: { strong: 'font-weight: 700; color: #e5a93d; text-decoration: underline wavy #e5a93d;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1em; color: #2a3441;',
                item: 'margin-bottom: 0.6em; line-height: 1.8; list-style-type: "♡ ";'
            },
            code: {
                block: 'background: #f4f1ea; padding: 1em; border-radius: 8px; border: 1px dashed #d3cabd; color: #528c9e; margin: 1em 0;',
                inline: 'background: #f4f1ea; padding: 2px 8px; border-radius: 12px; color: #d96c75;'
            },
            quote: 'border-left: 4px solid #e5a93d; background: #fffdf5; padding: 12px 16px; margin: 1.5em 0; color: #857a66; border-radius: 0 8px 8px 0;',
            image: 'max-width: 100%; border-radius: 4px; margin: 1.5em auto; display: block; border: 10px solid #ffffff; box-shadow: 2px 4px 12px rgba(0,0,0,0.08); transform: rotate(-1deg);',
            callouts: {
                'NOTE': { bg: '#fdfcf8', border: '#a4adc1', color: '#2a3441' },
                'TIP': { bg: '#fdfcf8', border: '#528c9e', color: '#528c9e' },
                'IMPORTANT': { bg: '#fdfcf8', border: '#d96c75', color: '#d96c75' },
                'WARNING': { bg: '#fdfcf8', border: '#e5a93d', color: '#e5a93d' },
                'CAUTION': { bg: '#fdfcf8', border: '#c35b5b', color: '#c35b5b' },
                'INFO': { bg: '#fdfcf8', border: '#6c96c4', color: '#6c96c4' }
            }
        }
    },
    glass: {
        id: 'glass',
        name: '弥散毛玻璃',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background: radial-gradient(circle at 10% 20%, rgb(255, 230, 230) 0%, rgb(230, 255, 255) 50%, rgb(230, 230, 255) 100%); padding: 30px 20px; color: #333333;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; font-size: 12px; color: rgba(0,0,0,0.4); text-align: center;'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 1.8em; line-height: 1.3; text-align: center;', content: 'font-weight: 800; color: #222222;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.4em; line-height: 1.4;', content: 'font-weight: 700; color: #333333;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.4;', content: 'font-weight: 600; color: #444444;' }
            },
            paragraph: 'line-height: 1.8; margin-bottom: 0.8em; color: #444444; background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 4px 15px rgba(0,0,0,0.03);',
            emphasis: { strong: 'font-weight: 700; color: #ff6b6b;' },
            list: {
                container: 'padding-left: 20px; margin-bottom: 1em; color: #444444; background: rgba(255,255,255,0.4); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 16px 16px 16px 36px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.8);',
                item: 'margin-bottom: 0.6em; line-height: 1.6;'
            },
            code: {
                block: 'background: rgba(255,255,255,0.6); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 1.2em; border-radius: 12px; border: 1px solid rgba(255,255,255,0.9); color: #555555; margin: 1em 0;',
                inline: 'background: rgba(255,255,255,0.7); padding: 2px 6px; border-radius: 6px; color: #ff6b6b; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.02);'
            },
            quote: 'border-left: 4px solid #a8c0ff; background: rgba(255,255,255,0.5); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 16px; margin: 1.5em 0; color: #555555; border-radius: 0 12px 12px 0;',
            image: 'max-width: 100%; border-radius: 16px; margin: 1em auto; display: block; border: 4px solid rgba(255,255,255,0.5); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);',
            callouts: {
                'NOTE': { bg: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.8)', color: '#666666' },
                'TIP': { bg: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.8)', color: '#4CAF50' },
                'IMPORTANT': { bg: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.8)', color: '#9C27B0' },
                'WARNING': { bg: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.8)', color: '#FF9800' },
                'CAUTION': { bg: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.8)', color: '#F44336' },
                'INFO': { bg: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.8)', color: '#2196F3' }
            }
        }
    },
    retroLetter: {
        id: 'retroLetter',
        name: '旧时信笺',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #f4efdf; background-image: radial-gradient(#d6cbb1 1px, transparent 1px); background-size: 30px 30px; padding: 36px 24px; color: #3a2e26; font-weight: 400;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; font-size: 13px; color: #8a7a6e; text-align: center; font-style: italic; letter-spacing: 0.1em; border-top: 1px dashed rgba(138, 122, 110, 0.3);'
            },
            title: {
                h1: { base: 'margin: 0 0 24px 0; font-size: 1.6em; line-height: 1.4; text-align: center;', content: 'font-weight: 700; color: #5c3029; letter-spacing: 0.05em;' },
                h2: { base: 'margin: 0 0 16px 0; font-size: 1.4em; line-height: 1.5; text-align: center;', content: 'font-weight: 500; color: #6a4a40;' },
                h3: { base: 'margin: 20px 0 12px; font-size: 1.2em; line-height: 1.5;', content: 'font-weight: 500; color: #7a5e54;' }
            },
            paragraph: 'line-height: 2.1; margin-bottom: 0.8em; color: #3a2e26; text-indent: 1.5em;',
            emphasis: { strong: 'font-weight: 700; color: #5c3029; background: rgba(92, 48, 41, 0.08); padding: 0 4px;' },
            list: {
                container: 'padding-left: 28px; margin-bottom: 1em; color: #3a2e26;',
                item: 'margin-bottom: 0.8em; line-height: 1.9;'
            },
            code: {
                block: 'background: rgba(214, 203, 177, 0.3); padding: 1.2em; border: 1px solid rgba(138, 122, 110, 0.2); border-left: 4px solid #8a7a6e; border-radius: 2px; color: #50443d; margin: 1em 0;',
                inline: 'background: rgba(214, 203, 177, 0.4); padding: 2px 6px; border-radius: 2px; color: #5c3029;'
            },
            quote: 'border-left: 2px solid #5c3029; padding: 0 0 0 20px; margin: 1.8em 0; color: #50443d; font-style: italic; font-size: 1.1em;',
            image: 'max-width: 100%; border-radius: 2px; margin: 1.5em auto; display: block; filter: sepia(0.35) contrast(1.1) brightness(0.9); box-shadow: 2px 4px 15px rgba(58, 46, 38, 0.15); border: 8px solid #fdfbf7;',
            callouts: {
                'NOTE': { bg: 'rgba(255, 255, 255, 0.4)', border: '#8a7a6e', color: '#3a2e26' },
                'TIP': { bg: 'rgba(92, 48, 41, 0.05)', border: '#5c3029', color: '#5c3029' },
                'IMPORTANT': { bg: 'rgba(106, 74, 64, 0.1)', border: '#6a4a40', color: '#6a4a40' },
                'WARNING': { bg: 'rgba(200, 150, 80, 0.1)', border: '#c89650', color: '#8c6020' },
                'CAUTION': { bg: 'rgba(160, 60, 60, 0.1)', border: '#a03c3c', color: '#a03c3c' },
                'INFO': { bg: 'rgba(100, 130, 160, 0.1)', border: '#6482a0', color: '#406080' }
            }
        }
    },
    premiumBlack: {
        id: 'premiumBlack',
        name: '黑胶典雅',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #111111; padding: 40px 24px; color: #e8e8e8; font-weight: 300;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; font-size: 12px; color: #888888; text-align: center; letter-spacing: 0.15em; text-transform: uppercase;'
            },
            title: {
                h1: { base: 'margin: 0 0 32px 0; font-size: 1.8em; line-height: 1.3; text-align: center;', content: 'font-weight: 600; color: #d4af37; letter-spacing: 0.1em;' },
                h2: { base: 'margin: 0 0 20px 0; font-size: 1.4em; line-height: 1.4; text-align: center;', content: 'font-weight: 500; color: #e8e8e8; border-bottom: 1px solid rgba(212, 175, 55, 0.3); padding-bottom: 8px; display: inline-block;' },
                h3: { base: 'margin: 24px 0 16px; font-size: 1.2em; line-height: 1.5;', content: 'font-weight: 400; color: #c0c0c0;' }
            },
            paragraph: 'line-height: 2.2; margin-bottom: 1.2em; color: #b8b8b8; font-weight: 300; text-align: justify;',
            emphasis: { strong: 'font-weight: 500; color: #d4af37;' },
            list: {
                container: 'padding-left: 20px; margin-bottom: 1.2em; color: #b8b8b8; list-style-type: none;',
                item: 'margin-bottom: 0.8em; line-height: 2; position: relative;'
            },
            code: {
                block: 'background: rgba(255, 255, 255, 0.03); padding: 1.4em; border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 4px; color: #a0a0a0; margin: 1.5em 0; font-family: monospace;',
                inline: 'background: rgba(212, 175, 55, 0.1); padding: 2px 6px; border-radius: 2px; color: #d4af37;'
            },
            quote: 'border-left: 0; border-top: 1px solid #d4af37; border-bottom: 1px solid #d4af37; padding: 20px 10px; margin: 2em 0; color: #c0c0c0; font-style: italic; text-align: center; font-size: 1.1em;',
            image: 'max-width: 100%; border-radius: 0; margin: 2em auto; display: block; filter: grayscale(40%) contrast(1.1); box-shadow: 0 10px 30px rgba(0,0,0,0.8);',
            callouts: {
                'NOTE': { bg: 'rgba(255, 255, 255, 0.05)', border: '#555555', color: '#b8b8b8' },
                'TIP': { bg: 'rgba(212, 175, 55, 0.08)', border: '#d4af37', color: '#d4af37' },
                'IMPORTANT': { bg: 'rgba(212, 175, 55, 0.15)', border: '#d4af37', color: '#f0e6d2' },
                'WARNING': { bg: 'rgba(255, 100, 50, 0.1)', border: '#ff6432', color: '#ff8a50' },
                'CAUTION': { bg: 'rgba(200, 50, 50, 0.1)', border: '#c83232', color: '#e66464' },
                'INFO': { bg: 'rgba(50, 100, 200, 0.1)', border: '#3264c8', color: '#64a0ff' }
            }
        }
    },
    artGallery: {
        id: 'artGallery',
        name: '艺术中心',
        styles: {
            imagePreview: 'width: 100%; height: 100%; background-color: #f0f0f2; padding: 32px 20px; color: #2c2c2e; font-weight: 400;',
            footer: {
                container: 'position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; font-size: 11px; color: #8e8e93; text-align: left; padding-left: 24px; letter-spacing: 0.1em; border-top: 1px solid #d1d1d6;'
            },
            title: {
                h1: { base: 'margin: 0 0 28px 0; font-size: 2em; line-height: 1.2;', content: 'font-weight: 700; color: #1c1c1e;' },
                h2: { base: 'margin: 0 0 20px 0; font-size: 1.4em; line-height: 1.5;', content: 'font-weight: 600; color: #3a3a3c;' },
                h3: { base: 'margin: 24px 0 16px; font-size: 1.2em; line-height: 1.5;', content: 'font-weight: 500; color: #48484a;' }
            },
            paragraph: 'line-height: 2; margin-bottom: 1.2em; color: #3a3a3c; font-weight: 400;',
            emphasis: { strong: 'font-weight: 600; color: #1c1c1e; border-bottom: 1px solid #1c1c1e; padding-bottom: 2px;' },
            list: {
                container: 'padding-left: 24px; margin-bottom: 1.2em; color: #3a3a3c;',
                item: 'margin-bottom: 0.8em; line-height: 1.8;'
            },
            code: {
                block: 'background: #e5e5ea; padding: 1.2em; border-radius: 6px; color: #48484a; margin: 1.5em 0; font-family: monospace;',
                inline: 'background: #d1d1d6; padding: 2px 6px; border-radius: 4px; color: #1c1c1e; font-size: 0.9em;'
            },
            quote: 'border-left: 3px solid #8e8e93; padding: 0 0 0 16px; margin: 1.5em 0; color: #636366; font-style: normal; font-size: 1.05em;',
            image: 'max-width: 100%; border-radius: 0; margin: 2em auto; display: block; filter: contrast(1.05) saturate(0.9); box-shadow: 0 4px 12px rgba(0,0,0,0.05);',
            callouts: {
                'NOTE': { bg: '#ffffff', border: '#d1d1d6', color: '#1c1c1e' },
                'TIP': { bg: '#f2f2f7', border: '#34c759', color: '#248a3d' },
                'IMPORTANT': { bg: '#e5e5ea', border: '#1c1c1e', color: '#1c1c1e' },
                'WARNING': { bg: '#fef0e1', border: '#ff9500', color: '#b26800' },
                'CAUTION': { bg: '#fceaea', border: '#ff3b30', color: '#bd2420' },
                'INFO': { bg: '#e9f0fe', border: '#007aff', color: '#0054b3' }
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
