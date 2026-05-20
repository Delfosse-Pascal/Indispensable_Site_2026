$dir = "J:\Indispensable_Site_2026\Programmes_Crack"
$files = Get-ChildItem -Path $dir -File

function NormKey($name) {
    $n = [System.IO.Path]::GetFileNameWithoutExtension($name).ToLower()
    $n = $n -replace '[^a-z0-9]+',' '
    return $n.Trim()
}

function HtmlEnc($s) {
    if (-not $s) { return '' }
    return ($s -replace '&','&amp;' -replace '<','&lt;' -replace '>','&gt;' -replace '"','&quot;' -replace "'",'&#39;')
}

function UrlEnc($s) {
    if (-not $s) { return '' }
    $r = [System.Uri]::EscapeDataString($s)
    $r = $r -replace '%2F','/' -replace '%5C','\'
    return $r
}

$byKey = @{}
foreach ($f in $files) {
    $k = NormKey $f.Name
    if (-not $byKey.ContainsKey($k)) { $byKey[$k] = @{ image=''; archive=''; imgSz=0; arcSz=0; display='' } }
    $disp = [System.IO.Path]::GetFileNameWithoutExtension($f.Name) -replace '_',' '
    if (-not $byKey[$k].display) { $byKey[$k].display = $disp }
    if ($f.Extension -in '.jpg','.jpeg','.png','.gif','.webp','.svg') {
        $byKey[$k].image = $f.Name; $byKey[$k].imgSz = $f.Length
    } elseif ($f.Extension -in '.rar','.zip','.iso','.7z') {
        $byKey[$k].archive = $f.Name; $byKey[$k].arcSz = $f.Length
    }
}

$keys = $byKey.Keys | Sort-Object
$perPage = 60
$totalPages = [math]::Ceiling($keys.Count / $perPage)

Write-Output "Total: $($keys.Count) entries / $totalPages pages"

# Template parts
$head = @'
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{TITLE}</title>

<link rel="canonical" href="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/">
<link rel="icon" href="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/favicondepascal.png" type="image/png">
<link rel="icon" href="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/favicondepascal.ico" type="image/x-icon">

<link rel="stylesheet" type="text/css" href="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/style.css">
<script src="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/script.js"></script>
<script src="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/menu.js" defer></script>
<link rel="stylesheet" href="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/basedusite.css">

<link rel="stylesheet" href="../assets/style.css">
<script src="../assets/script.js" defer></script>
<script src="../assets/menu.js" defer></script>

<style>
  .crack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.2rem;
    max-width: 1500px;
    margin: 1.5rem auto;
    padding: 0 1rem;
  }
  .card-crk {
    background: var(--bg-card);
    border: 2px solid var(--border);
    border-radius: 6px;
    padding: 0.9rem;
    box-shadow: 0 4px 10px var(--shadow);
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .card-crk:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 18px var(--shadow);
    border-color: var(--accent);
  }
  .card-crk h3 {
    font-size: 1.1rem;
    color: var(--accent-dark);
    margin-bottom: 0.5rem;
    word-break: break-word;
    line-height: 1.2;
    min-height: 2.4em;
  }
  [data-theme="dark"] .card-crk h3 { color: var(--accent-light); }
  .card-crk .imgwrap {
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    padding: 4px;
    margin-bottom: 0.6rem;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-crk .imgwrap img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: zoom-in;
  }
  .card-crk .meta {
    font-family: 'Consolas', monospace;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0.3rem 0;
    word-break: break-all;
  }
  .card-crk .meta b { color: var(--accent-dark); }
  [data-theme="dark"] .card-crk .meta b { color: var(--accent-light); }
  .card-crk .btn { font-size: 0.9rem; padding: 0.4rem 0.9rem; }
</style>
</head>
<body>

<header>
  <h1>Programmes &amp; Crack — Page {PAGENUM} / {TOTAL}</h1>
  <nav class="social-menu" aria-label="Liens sociaux">
    <ul>
      <li><a href="https://fr.pinterest.com/pascal509/mes-tableaux-tous-genre/" target="_blank" rel="noopener">Pinterest</a></li>
      <li><a href="https://www.flickr.com/photos/delfossepascal" target="_blank" rel="noopener">Flickr</a></li>
      <li><a href="https://www.tumblr.com/lestoilesdepascal" target="_blank" rel="noopener">Tumblr</a></li>
      <li><a href="https://x.com/PascalDelfossee" target="_blank" rel="noopener">X</a></li>
      <li><a href="https://www.youtube.com/c/DelfossePascal" target="_blank" rel="noopener">YouTube</a></li>
    </ul>
  </nav>
</header>

<main>
  <section class="context">
    <p><strong>Programmes &amp; Crack — page {PAGENUM} sur {TOTAL}.</strong> Catalogue local de logiciels, utilitaires et activateurs avec aperçus visuels.</p>
    <p style="margin-top:0.6rem">Cliquez sur une image pour l'afficher en grand. <kbd>Échap</kbd> pour fermer. Boutons "Télécharger" pour récupérer les archives.</p>
    <p style="margin-top:0.6rem">Tous les sous-dossiers de profondeur supérieure à 1 niveau sont ignorés (politique d'arborescence simple).</p>
  </section>

  {PAGINATION}

  <section class="crack-grid">
'@

$foot = @'
  </section>

  {PAGINATION}

  <section class="context" style="border-left-color: var(--accent-light)">
    <h2>Sauvegarder &amp; installer</h2>
    <p><strong>Aperçu :</strong> clic droit sur l'image &raquo; "Enregistrer l'image sous..." pour conserver la capture.</p>
    <p><strong>Archive :</strong> bouton "Télécharger" ou clic droit &raquo; "Enregistrer la cible sous...". Décompression avec 7-Zip / WinRAR.</p>
    <p><strong>Installation :</strong> exécutez le <code>Setup.exe</code> ou l'installateur fourni. Les notes d'utilisation et clés d'activation se trouvent généralement dans un fichier <code>Readme.txt</code> ou <code>Crack/</code> à l'intérieur de l'archive.</p>
  </section>
</main>

<footer>
  <p>Indispensable Site 2026 — Programmes &amp; Crack page {PAGENUM}/{TOTAL} &middot; <a href="../index.html">Accueil</a></p>
</footer>

</body>
</html>
'@

function BuildPagination($current, $total) {
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.AppendLine('<nav class="pagination" aria-label="Pagination">')
    if ($current -gt 1) {
        $prev = $current - 1
        $href = if ($prev -eq 1) { 'index.html' } else { ('page-{0:D2}.html' -f $prev) }
        [void]$sb.AppendLine("  <a href=`"$href`">&laquo; Précédent</a>")
    }
    for ($i = 1; $i -le $total; $i++) {
        $href = if ($i -eq 1) { 'index.html' } else { ('page-{0:D2}.html' -f $i) }
        if ($i -eq $current) {
            [void]$sb.AppendLine("  <span class=`"current`">$i</span>")
        } else {
            [void]$sb.AppendLine("  <a href=`"$href`">$i</a>")
        }
    }
    if ($current -lt $total) {
        $next = $current + 1
        $href = ('page-{0:D2}.html' -f $next)
        [void]$sb.AppendLine("  <a href=`"$href`">Suivant &raquo;</a>")
    }
    [void]$sb.AppendLine('</nav>')
    return $sb.ToString()
}

for ($p = 1; $p -le $totalPages; $p++) {
    $start = ($p - 1) * $perPage
    $end = [math]::Min($start + $perPage - 1, $keys.Count - 1)
    $pageKeys = $keys[$start..$end]
    $cards = New-Object System.Text.StringBuilder
    foreach ($k in $pageKeys) {
        $v = $byKey[$k]
        $title = HtmlEnc $v.display
        $img = $v.image; $arc = $v.archive
        $imgEnc = UrlEnc $img
        $arcEnc = UrlEnc $arc
        $imgHtml = HtmlEnc $img
        $arcHtml = HtmlEnc $arc
        $kbImg = [math]::Round($v.imgSz/1024, 0)
        $kbArc = [math]::Round($v.arcSz/1024, 0)
        $mbArc = [math]::Round($v.arcSz/1048576, 1)

        [void]$cards.AppendLine('    <article class="card-crk">')
        [void]$cards.AppendLine("      <h3>$title</h3>")
        if ($img) {
            [void]$cards.AppendLine('      <div class="imgwrap">')
            [void]$cards.AppendLine("        <img src=`"$imgEnc`" alt=`"$title`" loading=`"lazy`" data-title=`"$title`" data-size=`"$kbImg Ko`" onclick=`"openLightbox(this.src, this.dataset.title, this.dataset.size, this.naturalWidth + 'x' + this.naturalHeight + ' px')`">")
            [void]$cards.AppendLine('      </div>')
            [void]$cards.AppendLine("      <p class=`"meta`"><b>IMG</b> $imgHtml<br>$kbImg Ko &nbsp;|&nbsp; <span class=`"dims`">en cours...</span></p>")
        }
        if ($arc) {
            $sizeStr = if ($mbArc -ge 1) { "$mbArc Mo" } else { "$kbArc Ko" }
            [void]$cards.AppendLine("      <p class=`"meta`"><b>ARC</b> $arcHtml<br>$sizeStr</p>")
            [void]$cards.AppendLine("      <p><a class=`"btn`" href=`"$arcEnc`" download>Télécharger</a></p>")
        }
        [void]$cards.AppendLine('    </article>')
    }

    $pagination = BuildPagination $p $totalPages
    $page = $head -replace '\{TITLE\}',"Programmes Crack - Page $p" `
                  -replace '\{PAGENUM\}',$p `
                  -replace '\{TOTAL\}',$totalPages `
                  -replace '\{PAGINATION\}',$pagination
    $page += $cards.ToString()
    $footPage = $foot -replace '\{PAGINATION\}',$pagination `
                     -replace '\{PAGENUM\}',$p `
                     -replace '\{TOTAL\}',$totalPages
    $page += $footPage

    $outName = if ($p -eq 1) { 'index.html' } else { 'page-{0:D2}.html' -f $p }
    $outPath = Join-Path $dir $outName
    $page | Set-Content -Path $outPath -Encoding UTF8
    Write-Output "Wrote $outName ($($pageKeys.Count) cards)"
}
Write-Output "Done. $totalPages pages."
