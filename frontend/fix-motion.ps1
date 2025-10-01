# Fix framer-motion issues by removing imports and replacing components

$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove framer-motion imports
    $content = $content -replace 'import \{ motion[^}]* \} from "framer-motion";\r?\n', ''
    $content = $content -replace 'import \{ motion, useAnimation \} from "framer-motion";\r?\n', ''
    $content = $content -replace 'import \{ motion, AnimatePresence \} from "framer-motion";\r?\n', ''
    $content = $content -replace 'import \{ useInView \} from "react-intersection-observer";\r?\n', ''
    
    # Replace motion components with regular HTML elements
    $content = $content -replace 'motion\.div', 'div'
    $content = $content -replace 'motion\.h1', 'h1'
    $content = $content -replace 'motion\.h2', 'h2'
    $content = $content -replace 'motion\.h3', 'h3'
    $content = $content -replace 'motion\.p', 'p'
    $content = $content -replace 'motion\.section', 'section'
    $content = $content -replace 'motion\.button', 'button'
    
    # Remove animation props
    $content = $content -replace '\s+initial=\{[^}]*\}', ''
    $content = $content -replace '\s+animate=\{[^}]*\}', ''
    $content = $content -replace '\s+transition=\{[^}]*\}', ''
    $content = $content -replace '\s+variants=\{[^}]*\}', ''
    $content = $content -replace '\s+whileHover=\{[^}]*\}', ''
    $content = $content -replace '\s+whileInView=\{[^}]*\}', ''
    $content = $content -replace '\s+viewport=\{[^}]*\}', ''
    
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "All framer-motion issues fixed!"