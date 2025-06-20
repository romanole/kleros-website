# Lista delle pagine da aggiornare
 = @(
    'servizi.html', 
    'chi-siamo.html',
    'contatti.html',
    'consulenza.html',
    'software.html',
    'news.html',
    'blog.html',
    'editoria.html',
    'consulenti.html',
    'area-riservata.html'
)

Write-Host "Aggiornamento ordine menu: News prima di Blog..."
foreach ( in ) {
    if (Test-Path ) {
         = Get-Content  -Raw
        if ( -match 'href="blog\.html".*?Blog.*?href="news\.html".*?News') {
             =  -replace '(<li class="nav-item"><a href="software\.html" class="nav-link">Software</a></li>\s*)<li class="nav-item"><a href="blog\.html" class="nav-link">Blog</a></li>\s*<li class="nav-item"><a href="news\.html" class="nav-link">News</a></li>', '<li class="nav-item"><a href="news.html" class="nav-link">News</a></li><li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>'
            Set-Content  -Value 
            Write-Host " Menu aggiornato in "
        } else {
            Write-Host "  - ordine già corretto o pattern non trovato"
        }
    }
}

Write-Host "
Aggiornamento completato!"
