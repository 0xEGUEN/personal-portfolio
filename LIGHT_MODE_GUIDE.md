# 🌞 Light Mode Typography & Design Guide

## 📝 Font & Typography Improvements

### Font Weights & Spacing
Semua font di light mode telah disesuaikan untuk keseimbangan visual yang sempurna:

#### Heading (Serif)
- **Font Weight**: 400 (Regular)
- **Letter Spacing**: -0.5px (untuk visual yang lebih compact)
- **Color**: Gradient dari #1a1a1a ke #2563eb
- **Line Height**: 1.08 - 1.2

#### Body Text
- **Font Weight**: 400 (Regular)
- **Letter Spacing**: 0.2px - 0.3px
- **Color**: #555555 - #666666 (tergantung konteks)
- **Line Height**: 1.7 - 1.75

#### Labels & Small Text
- **Font Weight**: 600 (Semibold)
- **Letter Spacing**: 2.5px (untuk uppercase labels)
- **Color**: #888888
- **Font Size**: 11px - 13px

### Color Hierarchy

#### Primary Text
- **Color**: #1a1a1a (hampir hitam)
- **Usage**: Headings, titles, main content
- **Weight**: 400 - 700

#### Secondary Text
- **Color**: #555555 - #666666
- **Usage**: Body text, descriptions
- **Weight**: 400

#### Tertiary Text
- **Color**: #888888
- **Usage**: Labels, captions, metadata
- **Weight**: 500 - 600

#### Accent Colors
- **Blue**: #2563eb (untuk links, highlights)
- **Green**: #8b9d6f (untuk sage accent)
- **Success**: #22c55e (untuk checkmarks)

## 🎨 Visual Balance

### Spacing & Padding
- **Cards**: Padding 24px - 32px (balanced)
- **Sections**: Padding 56px - 80px (consistent)
- **Gap**: 24px - 40px (proportional)

### Border & Shadow
- **Border Color**: #e5e5e5 (subtle, tidak mencolok)
- **Border Width**: 1px (konsisten)
- **Shadow**: 0 2px 8px rgba(0, 0, 0, 0.05) (subtle)
- **Hover Shadow**: 0 8px 24px rgba(37, 99, 235, 0.12) (gentle)

### Background Gradients
- **Primary**: Linear gradient dari #ffffff ke #f9f9f9
- **Secondary**: Linear gradient dari #fafafa ke #f5f5f5
- **Tertiary**: Linear gradient dari #f5f5f5 ke #efefef

## ✨ Effect & Animation Balance

### Hover Effects
- **Scale**: 1.02 (subtle, tidak berlebihan)
- **Translate**: -8px (lift effect yang gentle)
- **Duration**: 0.3s (smooth, tidak terlalu cepat)

### Transitions
- **Color Transition**: 0.4s ease (smooth)
- **Transform Transition**: 0.3s ease (responsive)
- **Box Shadow**: 0.4s ease (gradual)

### Focus States
- **Outline**: 2px solid #2563eb
- **Outline Offset**: 2px
- **Background**: Subtle rgba(37, 99, 235, 0.03)

## 🔤 Typography Consistency

### Headings
```css
h1, h2, h3 {
  font-family: "DM Serif Display", serif;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: #1a1a1a;
}
```

### Body Text
```css
p, span, div {
  font-family: "Inconsolata", "Inter", monospace;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: #555555;
  line-height: 1.7;
}
```

### Labels
```css
label, .label {
  font-weight: 600;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #888888;
  font-size: 11px;
}
```

## 🎯 Element-Specific Styling

### Service Cards
- **Background**: Gradient #ffffff → #f9f9f9
- **Border**: 1px solid #e5e5e5
- **Title**: #1a1a1a, weight 400
- **Description**: #666666, weight 400
- **Icon**: Blue #2563eb with subtle background

### Project Cards
- **Background**: Gradient #ffffff → #f9f9f9
- **Title**: #1a1a1a, weight 400
- **Tags**: #888888 on #f0f0f0 background
- **Hover**: Border #2563eb, shadow with blue tint

### Blog Cards
- **Background**: Gradient #ffffff → #f9f9f9
- **Title**: #1a1a1a, weight 400
- **Meta**: rgba(0, 0, 0, 0.5), weight 400
- **Tag**: Blue background with blue text
- **Read More**: #2563eb, hover to #8b9d6f

### Buttons
- **Primary**: Dark background (#1a1a1a) with white text
- **Sage**: Green background (#8b9d6f) with white text
- **Outline**: Transparent with blue border
- **Font Weight**: 600 (bold untuk emphasis)

### Form Elements
- **Background**: rgba(0, 0, 0, 0.03) (very subtle)
- **Border**: rgba(0, 0, 0, 0.1)
- **Focus**: Blue tint background & border
- **Text**: #1a1a1a, weight 400
- **Placeholder**: rgba(0, 0, 0, 0.4)

## 📱 Responsive Typography

### Desktop
- **Heading**: clamp(32px, 4vw, 48px)
- **Body**: 16px
- **Small**: 13px - 14px

### Tablet
- **Heading**: clamp(28px, 3.5vw, 40px)
- **Body**: 15px
- **Small**: 12px - 13px

### Mobile
- **Heading**: clamp(24px, 3vw, 32px)
- **Body**: 14px
- **Small**: 11px - 12px

## 🎨 Color Palette Light Mode

```
Primary Background:    #ffffff
Secondary Background:  #f9f9f9
Tertiary Background:   #f5f5f5

Primary Text:          #1a1a1a
Secondary Text:        #555555
Tertiary Text:         #666666
Quaternary Text:       #888888

Accent Blue:           #2563eb
Accent Green:          #8b9d6f
Success Green:         #22c55e
Warning Orange:        #f59e0b
Error Red:             #ef4444

Border:                #e5e5e5
Shadow:                rgba(0, 0, 0, 0.05-0.15)
```

## ✅ Best Practices

1. **Font Weight**: Gunakan 400 untuk body, 500-600 untuk labels, 700 untuk emphasis
2. **Letter Spacing**: Maintain 0.2-0.3px untuk body, -0.5px untuk headings
3. **Color Contrast**: Minimal 4.5:1 untuk accessibility
4. **Spacing**: Consistent padding & margins untuk visual harmony
5. **Shadows**: Subtle shadows untuk depth, bukan drama
6. **Transitions**: Smooth 0.3-0.4s untuk semua interactions
7. **Hover States**: Gentle scale/translate, bukan dramatic changes

## 🔄 Dark Mode Comparison

| Element | Dark Mode | Light Mode |
|---------|-----------|-----------|
| Background | #0a0a0a | #ffffff |
| Text Primary | #ffffff | #1a1a1a |
| Text Secondary | #b0b0b0 | #666666 |
| Accent | #4a9eff | #2563eb |
| Border | #333 | #e5e5e5 |
| Shadow | Strong | Subtle |

---

**Semua elemen telah disesuaikan untuk keseimbangan visual yang sempurna di light mode!**
