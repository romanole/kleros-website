# Lista delle pagine da aggiornare
 = @(
    'index.html',
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

Write-Host "Aggiornamento icone footer da blu a bianco..."
foreach ( in ) {
    if (Test-Path ) {
        (Get-Content ) -replace 'color: #3498db;"></i>', 'color: white;"></i>' | Set-Content 
        Write-Host "✓ Icone aggiornate in "
    }
}

Write-Host "
Aggiornamento linee decorative da blu a bianco..."
foreach ( in ) {
    if (Test-Path ) {
        (Get-Content ) -replace 'background: #3498db;"></span>', 'background: white;"></span>' | Set-Content 
        Write-Host "✓ Linee decorative aggiornate in "
    }
}

Write-Host "
Aggiornamento completato!"
