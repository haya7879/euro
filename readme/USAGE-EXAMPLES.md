# أمثلة الاستخدام - Usage Examples

## استخدام Performance Optimization Hooks

### 1. useLayoutOptimization - منع Layout Thrashing

```typescript
"use client";
import { useLayoutOptimization } from '@/hooks/useLayoutOptimization';
import { useEffect, useRef } from 'react';

export default function OptimizedComponent() {
  const { read, write } = useLayoutOptimization();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ❌ BAD: يسبب forced reflow
    const badUpdate = () => {
      const width = elementRef.current?.offsetWidth || 0;
      if (elementRef.current) {
        elementRef.current.style.width = width + 10 + 'px';
      }
      const height = elementRef.current?.offsetHeight || 0; // Forced reflow!
      if (elementRef.current) {
        elementRef.current.style.height = height + 10 + 'px';
      }
    };

    // ✅ GOOD: يجمع القراءات والكتابات
    const goodUpdate = () => {
      let dimensions = { width: 0, height: 0 };
      
      // جميع القراءات أولاً
      read(() => {
        dimensions.width = elementRef.current?.offsetWidth || 0;
        dimensions.height = elementRef.current?.offsetHeight || 0;
      });

      // ثم جميع الكتابات
      write(() => {
        if (elementRef.current) {
          elementRef.current.style.width = dimensions.width + 10 + 'px';
          elementRef.current.style.height = dimensions.height + 10 + 'px';
        }
      });
    };

    goodUpdate();
  }, [read, write]);

  return <div ref={elementRef}>Optimized Content</div>;
}
```

### 2. useOptimizedScroll - تحسين Scroll Events

```typescript
"use client";
import { useOptimizedScroll } from '@/hooks/useLayoutOptimization';
import { useState } from 'react';

export default function ScrollComponent() {
  const [scrollY, setScrollY] = useState(0);

  // ✅ Optimized: يستخدم requestAnimationFrame
  useOptimizedScroll((y) => {
    setScrollY(y);
    // يمكنك إضافة logic إضافية هنا
    if (y > 100) {
      // إظهار navigation bar مثلاً
    }
  });

  return (
    <div className="fixed top-0 right-0">
      Scroll Position: {Math.round(scrollY)}px
    </div>
  );
}
```

### 3. useOptimizedResize - تحسين Resize Events

```typescript
"use client";
import { useOptimizedResize } from '@/hooks/useLayoutOptimization';
import { useState } from 'react';

export default function ResponsiveComponent() {
  const [isMobile, setIsMobile] = useState(false);

  useOptimizedResize((width, height) => {
    setIsMobile(width < 768);
    // يمكنك إضافة logic إضافية
    console.log(`Window size: ${width}x${height}`);
  });

  return (
    <div>
      {isMobile ? (
        <div>Mobile View</div>
      ) : (
        <div>Desktop View</div>
      )}
    </div>
  );
}
```

### 4. useOptimizedMeasure - قياس العناصر بدون Forced Reflow

```typescript
"use client";
import { useOptimizedMeasure } from '@/hooks/useLayoutOptimization';
import { useEffect } from 'react';

export default function MeasuredComponent() {
  const { elementRef, measure, dimensions } = useOptimizedMeasure<HTMLDivElement>();

  useEffect(() => {
    // قياس العنصر بعد التحميل
    measure((dims) => {
      console.log(`Element size: ${dims.width}x${dims.height}`);
    });
  }, [measure]);

  return (
    <div ref={elementRef} className="measured-element">
      Width: {dimensions.width}px, Height: {dimensions.height}px
    </div>
  );
}
```

### 5. useDebounce - تأخير العمليات المكلفة

```typescript
"use client";
import { useDebounce } from '@/hooks/useLayoutOptimization';
import { useState } from 'react';

export default function SearchComponent() {
  const [query, setQuery] = useState('');

  // ✅ يتم استدعاء API فقط بعد توقف المستخدم عن الكتابة
  const debouncedSearch = useDebounce((searchQuery: string) => {
    // استدعاء API للبحث
    console.log('Searching for:', searchQuery);
    // fetch(`/api/search?q=${searchQuery}`)
  }, 500); // 500ms delay

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search..."
    />
  );
}
```

### 6. useThrottle - تحديد معدل العمليات المكلفة

```typescript
"use client";
import { useThrottle } from '@/hooks/useLayoutOptimization';

export default function TrackingComponent() {
  // ✅ يتم استدعاء التتبع مرة واحدة كل ثانية فقط
  const throttledTrack = useThrottle((event: string) => {
    // إرسال event للتتبع
    console.log('Tracking event:', event);
    // analytics.track(event);
  }, 1000); // 1 second

  const handleClick = () => {
    throttledTrack('button_clicked');
  };

  return (
    <button onClick={handleClick}>
      Click Me (Throttled Tracking)
    </button>
  );
}
```

## تحسينات Swiper

### قبل:
```typescript
// ❌ يسبب forced reflow
const citiesSwiper = new Swiper('.cities-swiper', {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 'auto', // ❌ BAD
  spaceBetween: 8,
  loop: true,
  // ... rest
});
```

### بعد:
```typescript
// ✅ محسّن
const rafId = requestAnimationFrame(() => {
  const citiesSwiper = new Swiper('.cities-swiper', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 2, // ✅ GOOD: قيمة ثابتة
    spaceBetween: 8,
    loop: true,
    observer: false, // ✅ تعطيل observer
    resizeObserver: false, // ✅ تعطيل resizeObserver
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // ✅ تحسين UX
    },
    breakpoints: {
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
  });
});

return () => {
  cancelAnimationFrame(rafId);
};
```

## تحسينات Framer Motion

### قبل:
```typescript
// ❌ bundle كبير + spring animations بطيئة
import { motion } from "framer-motion";

<motion.div
  transition={{
    duration: 0.7,
    type: "spring",
    stiffness: 100,
    damping: 15,
  }}
  whileHover={{
    y: -3,
    transition: {
      type: "spring",
      stiffness: 300,
    },
  }}
>
  {children}
</motion.div>
```

### بعد:
```typescript
// ✅ bundle أصغر + أداء أفضل
import { motion, LazyMotion, domAnimation } from "framer-motion";

<LazyMotion features={domAnimation} strict>
  <motion.div
    style={{
      contain: "layout style paint", // ✅ CSS containment
      willChange: "transform, opacity", // ✅ will-change hint
    }}
    transition={{
      duration: 0.5, // ✅ أسرع
      ease: [0.25, 0.1, 0.25, 1], // ✅ cubic-bezier
      type: "tween", // ✅ أداء أفضل من spring
    }}
    whileHover={{
      y: -3,
      transition: {
        duration: 0.2, // ✅ استجابة سريعة
        ease: "easeOut",
      },
    }}
  >
    {children}
  </motion.div>
</LazyMotion>
```

## تحسينات CSS

### CSS Containment
```css
/* ✅ استخدم contain للعناصر المعزولة */
.card {
  contain: layout style paint;
}

.slider {
  contain: layout style paint;
  content-visibility: auto;
}
```

### Hardware Acceleration
```css
/* ✅ استخدم transform للـ hardware acceleration */
.animated-element {
  transform: translateZ(0);
  will-change: transform;
}

/* ❌ تجنب */
.animated-element {
  will-change: auto; /* لا فائدة */
}
```

### Animations Best Practices
```css
/* ✅ استخدم transform و opacity فقط */
.smooth-animation {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* ❌ تجنب width, height, top, left في animations */
.laggy-animation {
  transition: width 0.3s ease, height 0.3s ease; /* يسبب reflow */
}
```

## نصائح عامة | General Tips

### 1. Batch DOM Operations
```typescript
// ✅ GOOD
const elements = document.querySelectorAll('.item');
const fragment = document.createDocumentFragment();

elements.forEach(el => {
  const clone = el.cloneNode(true);
  fragment.appendChild(clone);
});

document.body.appendChild(fragment);

// ❌ BAD
elements.forEach(el => {
  document.body.appendChild(el.cloneNode(true)); // Multiple reflows!
});
```

### 2. استخدم CSS Classes بدلاً من inline styles
```typescript
// ✅ GOOD
element.classList.add('active');

// ❌ BAD
element.style.width = '100px';
element.style.height = '100px';
element.style.backgroundColor = 'red';
```

### 3. Read then Write
```typescript
// ✅ GOOD
const heights = elements.map(el => el.offsetHeight); // Read all
heights.forEach((height, i) => {
  elements[i].style.height = height + 10 + 'px'; // Write all
});

// ❌ BAD
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height + 10 + 'px'; // Write
  // Causes forced reflow on each iteration!
});
```

### 4. استخدم passive event listeners
```typescript
// ✅ GOOD
element.addEventListener('scroll', handler, { passive: true });
element.addEventListener('touchmove', handler, { passive: true });

// ❌ BAD
element.addEventListener('scroll', handler); // قد يمنع scroll optimization
```

## قياس التحسينات | Measuring Improvements

### Chrome DevTools Performance
```javascript
// قبل التحديل: ابحث عن
// - Recalculate Style (> 50ms)
// - Layout (> 30ms)
// - Forced Reflow warnings

// بعد التحديل: يجب أن تكون
// - Recalculate Style (< 20ms)
// - Layout (< 10ms)
// - لا توجد Forced Reflow warnings
```

---

لأي أسئلة أو استفسارات، يرجى الرجوع إلى `PERFORMANCE-IMPROVEMENTS.md`

