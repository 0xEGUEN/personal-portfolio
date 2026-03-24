#!/usr/bin/env python3
import re

with open('gallery.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_pattern = r'<div class="empty-state">.*?</div>\s*</div>\s*</section>'

new_html = '''<div class="gallery-grid">
                        <!-- Discord Bot Project -->
                        <div class="gallery-card">
                            <div class="gallery-card-header">
                                <div class="gallery-icon">
                                    <span class="material-symbols-outlined">smart_toy</span>
                                </div>
                                <h3>Discord Bot</h3>
                            </div>
                            <div class="gallery-card-content">
                                <p class="gallery-desc">Feature-rich Discord bot built with Python. Includes ping, hello, echo, info commands and more. Perfect for community management and automation.</p>
                                <div class="gallery-tech">
                                    <span class="tech-badge">Python</span>
                                    <span class="tech-badge">Discord.py</span>
                                    <span class="tech-badge">Bot</span>
                                </div>
                            </div>
                            <div class="gallery-card-footer">
                                <a href="https://github.com/0xEGUEN/discord-bot-isen" target="_blank" class="gallery-link">
                                    <span>View on GitHub</span>
                                    <span class="material-symbols-outlined">open_in_new</span>
                                </a>
                            </div>
                        </div>

                        <!-- Expense Manager Project -->
                        <div class="gallery-card">
                            <div class="gallery-card-header">
                                <div class="gallery-icon">
                                    <span class="material-symbols-outlined">savings</span>
                                </div>
                                <h3>Money Manager</h3>
                            </div>
                            <div class="gallery-card-content">
                                <p class="gallery-desc">Smart expense tracking to control your spending optimally. Built with Vue 3 and Flutter for cross-platform support with modern UI/UX.</p>
                                <div class="gallery-tech">
                                    <span class="tech-badge">Vue 3</span>
                                    <span class="tech-badge">Flutter</span>
                                    <span class="tech-badge">TypeScript</span>
                                    <span class="tech-badge">Finance</span>
                                </div>
                            </div>
                            <div class="gallery-card-footer">
                                <a href="https://github.com/0xEGUEN/aplikasi-manajer-duit-2-fix" target="_blank" class="gallery-link">
                                    <span>View on GitHub</span>
                                    <span class="material-symbols-outlined">open_in_new</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>'''

content = re.sub(old_pattern, new_html, content, flags=re.DOTALL)

with open('gallery.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Gallery updated with projects')
