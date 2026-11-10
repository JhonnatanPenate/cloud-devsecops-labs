# Genera los PNG de los diagramas con Graphviz (sin metadatos C2PA).
# Uso:
#   powershell -ExecutionPolicy Bypass -File docs\architecture\render-diagrams.ps1            -> solo overview.dot
#   powershell -ExecutionPolicy Bypass -File docs\architecture\render-diagrams.ps1 -All       -> todos los .dot
param([switch]$All)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Get-Command dot -ErrorAction SilentlyContinue)) {
    Write-Host "Graphviz no esta instalado o no esta en el PATH." -ForegroundColor Red
    Write-Host "Instala con: winget install --id Graphviz.Graphviz -e"
    exit 1
}

if ($All) { $files = Get-ChildItem -Path $here -Filter *.dot }
else      { $files = Get-ChildItem -Path (Join-Path $here "overview.dot") }

foreach ($f in $files) {
    $png = Join-Path $here ($f.BaseName + ".png")
    dot -Tpng -Gdpi=150 $f.FullName -o $png
    Write-Host "OK  $($f.Name) -> $($f.BaseName).png" -ForegroundColor Green
}
