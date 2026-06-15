$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceDir = Join-Path $projectRoot "frontend"
$targetDir = Join-Path $PSScriptRoot "src\main\resources\static"

if (-not (Test-Path $sourceDir)) {
    throw "No se encontro la carpeta frontend en: $sourceDir"
}

if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir | Out-Null
}

Get-ChildItem -Path $targetDir -Force | Remove-Item -Recurse -Force

$itemsToCopy = @(
    "css",
    "imagenes",
    "img",
    "js",
    "admin.html",
    "confirmacion-taller.html",
    "confirmacion.html",
    "crear-taller.html",
    "detalle-taller.html",
    "index.html",
    "inscripcion.html",
    "login.html",
    "perfil.html",
    "registro.html",
    "talleres.html"
)

foreach ($item in $itemsToCopy) {
    $sourcePath = Join-Path $sourceDir $item

    if (Test-Path $sourcePath) {
        Copy-Item -Path $sourcePath -Destination $targetDir -Recurse -Force
    }
}

Write-Output "Frontend sincronizado en $targetDir"
