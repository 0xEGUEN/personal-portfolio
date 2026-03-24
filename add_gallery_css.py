#!/usr/bin/env python3

css_addition = '''
/* Gallery Cards (Project Showcase) */
.gallery-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.gallery-card:hover {
  border-color: var(--accent-primary);
  box-shadow: 0 16px 32px rgba(108, 143, 255, 0.12);
  transform: translateY(-4px);
}

.gallery-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

.gallery-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, rgba(108, 143, 255, 0.15), rgba(217, 225, 197, 0.1));
  border-radius: 8px;
  color: var(--accent-primary);
  font-size: 24px;
}

.gallery-card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.gallery-card-content {
  flex: 1;
  padding: 20px 24px;
}

.gallery-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.gallery-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-badge {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(108, 143, 255, 0.1);
  border: 1px solid rgba(108, 143, 255, 0.2);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--accent-primary);
  font-family: var(--font-mono);
}

.gallery-card-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}

.gallery-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: var(--accent-primary);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid var(--accent-primary);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.gallery-link:hover {
  background: var(--accent-primary);
  color: var(--bg-base);
}

.gallery-link .material-symbols-outlined {
  font-size: 18px;
}

/* Light mode gallery card adjustments */
body.light-mode .gallery-card {
  background: var(--bg-secondary);
}

body.light-mode .tech-badge {
  background: rgba(61, 90, 241, 0.1);
  border-color: rgba(61, 90, 241, 0.2);
  color: var(--accent-primary);
}

body.light-mode .gallery-link {
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

body.light-mode .gallery-link:hover {
  background: var(--accent-primary);
  color: var(--bg-primary);
}
'''

with open('css/style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the position to insert (after .gallery-item:hover .gallery-caption)
insertion_point = content.find('.gallery-item:hover .gallery-caption {')
if insertion_point != -1:
    # Find the end of this rule
    closing_brace = content.find('}', insertion_point)
    if closing_brace != -1:
        insertion_point = closing_brace + 1
        content = content[:insertion_point] + css_addition + content[insertion_point:]
        
        with open('css/style.css', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print('✅ Gallery card styles added')
    else:
        print('❌ Could not find closing brace')
else:
    print('❌ Could not find insertion point')
